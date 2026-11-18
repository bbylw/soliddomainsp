import {
  Errored,
  For,
  Loading,
  Show,
  createEffect,
  createSignal,
  onSettled,
} from "solid-js";
import type { LinksData } from "../types";
import LinkCard from "../components/LinkCard";
import { ErrorState, LoadingState } from "../components/LoadState";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import TopNav from "../components/TopNav";
import { createLinks } from "../data/links";
import { NAV_ITEMS } from "../nav";

interface NavState {
  /** Hash pinned by a programmatic scroll; ScrollSpy stays quiet until then. */
  pinnedHash: string | null;
}

export default function Home() {
  const data = createLinks();
  const [activeHash, setActiveHash] = createSignal(NAV_ITEMS[0].href);
  const navState: NavState = { pinnedHash: null };
  let pinTimer: number | undefined;

  function releaseActiveHashPin() {
    window.clearTimeout(pinTimer);
    window.removeEventListener("scroll", scheduleActiveHashPinRelease);
    navState.pinnedHash = null;
  }

  function scheduleActiveHashPinRelease() {
    // A smooth scroll keeps emitting scroll events, so the pin lifts only once
    // the page has been still for a moment (also covers interrupted scrolls).
    window.clearTimeout(pinTimer);
    pinTimer = window.setTimeout(releaseActiveHashPin, 150);
  }

  function pinActiveHash(hash: string) {
    navState.pinnedHash = hash;
    setActiveHash(hash);
    window.addEventListener("scroll", scheduleActiveHashPinRelease, {
      passive: true,
    });
    scheduleActiveHashPinRelease();
  }

  const scrollToHash = (hash: string) => {
    const target = document.getElementById(hash.slice(1));
    if (!target) return undefined;

    pinActiveHash(hash);
    target.scrollIntoView({ behavior: "smooth" });
    return target;
  };

  const handleNavigate = (event: MouseEvent, href: string) => {
    event.preventDefault();
    if (!scrollToHash(href)) return;

    const url = `${location.protocol}//${location.host}${location.pathname}${href}`;
    history.pushState({ path: url }, "", url);
  };

  const syncActiveFromHash = () => {
    const hash = location.hash;
    if (!hash) {
      setActiveHash(NAV_ITEMS[0].href);
      return;
    }

    scrollToHash(hash);
  };

  onSettled(() => {
    window.addEventListener("hashchange", syncActiveFromHash);

    return () => {
      window.removeEventListener("hashchange", syncActiveFromHash);
      releaseActiveHashPin();
    };
  });

  return (
    <>
      <SiteHeader />
      <TopNav activeHash={activeHash()} onNavigate={handleNavigate} />
      <main id="app-main" data-page="home">
        <Errored fallback={(error, reset) => <ErrorState onRetry={reset} />}>
          <Loading fallback={<LoadingState />}>
            <Show when={data()}>
              {(links) => (
                <CategorySections
                  links={links()}
                  navState={navState}
                  onActiveHashChange={setActiveHash}
                  onSectionsReady={syncActiveFromHash}
                />
              )}
            </Show>
          </Loading>
        </Errored>
        <noscript>请启用 JavaScript 以加载导航卡片列表。</noscript>
      </main>
      <SiteFooter />
    </>
  );
}

function CategorySections(props: {
  links: LinksData;
  navState: NavState;
  onActiveHashChange: (hash: string) => void;
  onSectionsReady: () => void;
}) {
  createEffect(
    () => props.links,
    () => {
      const mainEl = document.getElementById("app-main");
      const sections = Array.from(
        mainEl?.querySelectorAll<HTMLElement>("section[id]") ?? [],
      );
      let frame: number | undefined;

      // ScrollSpy by position rather than by intersection: the section that owns
      // the reading line wins, so the first category is active at the very top
      // and the last one at the bottom, where no single section intersects.
      const updateActive = () => {
        if (props.navState.pinnedHash !== null) return;

        const line = window.innerHeight * 0.2;
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        let current = atBottom
          ? sections[sections.length - 1]
          : sections[0];

        if (!atBottom) {
          for (const section of sections) {
            if (section.getBoundingClientRect().top <= line) current = section;
          }
        }

        if (current) props.onActiveHashChange(`#${current.id}`);
      };

      const scheduleUpdate = () => {
        if (frame !== undefined) return;
        frame = requestAnimationFrame(() => {
          frame = undefined;
          updateActive();
        });
      };

      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate, { passive: true });

      updateActive();
      props.onSectionsReady();

      return () => {
        window.removeEventListener("scroll", scheduleUpdate);
        window.removeEventListener("resize", scheduleUpdate);
        if (frame !== undefined) cancelAnimationFrame(frame);
      };
    },
  );

  return (
    <For each={props.links.categories}>
      {(category) => (
        <section id={category.id}>
          <h2 class="category-title">{category.title}</h2>
          <div class="link-grid">
            <For each={category.links}>
              {(item) => <LinkCard item={item} />}
            </For>
          </div>
        </section>
      )}
    </For>
  );
}
