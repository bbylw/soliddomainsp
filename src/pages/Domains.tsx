import { Errored, For, Loading, Show } from "solid-js";
import type { LinksData } from "../types";
import LinkCard from "../components/LinkCard";
import { ErrorState, LoadingState } from "../components/LoadState";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { createLinks } from "../data/links";

export default function Domains() {
  const data = createLinks();

  return (
    <>
      <SiteHeader linked />
      <main id="app-main" data-page="domains">
        <section id="domains" aria-label="免费域名与 DNS 托管">
          <div class="link-grid" id="domains-grid">
            <Errored fallback={(error, reset) => <ErrorState onRetry={reset} />}>
              <Loading fallback={<LoadingState />}>
                <Show when={data()}>
                  {(links) => (
                    <For each={links().domains}>
                      {(item) => <LinkCard item={item} />}
                    </For>
                  )}
                </Show>
              </Loading>
            </Errored>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
