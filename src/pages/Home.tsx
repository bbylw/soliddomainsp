import {
  For,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import LinkCard from "../components/LinkCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import TopNav from "../components/TopNav";
import { createLinksResource } from "../data/links";
import { NAV_ITEMS } from "../nav";

export default function Home() {
  const [data] = createLinksResource();
  const [activeHash, setActiveHash] = createSignal(NAV_ITEMS[0].href);
  let mainEl!: HTMLElement;
  let scrollTimer: number | undefined;
  let clickScrolling = false;

  const handleNavigate = (event: MouseEvent, href: string) => {
    event.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    clickScrolling = true;
    window.clearTimeout(scrollTimer);
    setActiveHash(href);

    target.scrollIntoView({ behavior: "smooth" });

    const url = `${location.protocol}//${location.host}${location.pathname}${href}`;
    history.pushState({ path: url }, "", url);

    scrollTimer = window.setTimeout(() => {
      clickScrolling = false;
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

  onMount(() => {
    window.addEventListener("hashchange", syncActiveFromHash);
  });

  onCleanup(() => {
    window.removeEventListener("hashchange", syncActiveFromHash);
    window.clearTimeout(scrollTimer);
  });

  createEffect(() => {
    if (!data()) return;

    const sections = mainEl.querySelectorAll("section[id]");
    let observer: IntersectionObserver | undefined;

    if ("IntersectionObserver" in window && sections.length) {
      observer = new IntersectionObserver(
        (entries) => {
          if (clickScrolling) return;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHash(`#${entry.target.id}`);
            }
          });
        },
        { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
      );
      sections.forEach((section) => observer?.observe(section));
    }

    syncActiveFromHash();

    onCleanup(() => observer?.disconnect());
  });

  return (
    <>
      <SiteHeader />
      <TopNav activeHash={activeHash()} onNavigate={handleNavigate} />
      <main id="app-main" data-page="home" ref={mainEl}>
        <Show when={data()}>
          {(links) => (
            <For each={links().categories}>
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
          )}
        </Show>
        <noscript>请启用 JavaScript 以加载导航卡片列表。</noscript>
      </main>
      <SiteFooter />
    </>
  );
}
