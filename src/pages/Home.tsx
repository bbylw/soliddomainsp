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
  clickScrolling: boolean;
}

export default function Home() {
  const data = createLinks();
  const [activeHash, setActiveHash] = createSignal(NAV_ITEMS[0].href);
  const navState: NavState = { clickScrolling: false };
  let scrollTimer: number | undefined;

  const handleNavigate = (event: MouseEvent, href: string) => {
    event.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    navState.clickScrolling = true;
    window.clearTimeout(scrollTimer);
    setActiveHash(href);

    target.scrollIntoView({ behavior: "smooth" });

    const url = `${location.protocol}//${location.host}${location.pathname}${href}`;
    history.pushState({ path: url }, "", url);

    scrollTimer = window.setTimeout(() => {
      navState.clickScrolling = false;
    }, 700);
  };

  const syncActiveFromHash = () => {
    const hash = location.hash;
    if (!hash) {
      setActiveHash(NAV_ITEMS[0].href);
      return;
    }

    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
    setActiveHash(hash);
  };

  onSettled(() => {
    window.addEventListener("hashchange", syncActiveFromHash);

    return () => {
      window.removeEventListener("hashchange", syncActiveFromHash);
      window.clearTimeout(scrollTimer);
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
      const sections = mainEl?.querySelectorAll("section[id]") ?? [];
      let observer: IntersectionObserver | undefined;

      if ("IntersectionObserver" in window && sections.length) {
        observer = new IntersectionObserver(
          (entries) => {
            if (props.navState.clickScrolling) return;
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                props.onActiveHashChange(`#${entry.target.id}`);
              }
            });
          },
          { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
        );
        sections.forEach((section) => observer?.observe(section));
      }

      props.onSectionsReady();

      return () => observer?.disconnect();
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
