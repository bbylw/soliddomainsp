import { For, Show } from "solid-js";
import LinkCard from "../components/LinkCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { createLinksResource } from "../data/links";

export default function Domains() {
  const [data] = createLinksResource();

  return (
    <>
      <SiteHeader linked />
      <main id="app-main" data-page="domains">
        <section id="domains" aria-label="免费域名与 DNS 托管">
          <div class="link-grid" id="domains-grid">
            <Show when={data()}>
              {(links) => (
                <For each={links().domains}>
                  {(item) => <LinkCard item={item} />}
                </For>
              )}
            </Show>
          </div>
        </section>
        <noscript>请启用 JavaScript 以加载域名导航列表。</noscript>
      </main>
      <SiteFooter />
    </>
  );
}
