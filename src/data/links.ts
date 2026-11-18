import { createMemo } from "solid-js";
import type { LinksData } from "../types";

async function loadLinks(): Promise<LinksData> {
  // Matches the <link rel="preload" as="fetch"> in the HTML head; the list is
  // the page's primary content, so keep it ahead of background requests.
  const response = await fetch("links.json", { priority: "high" });
  if (!response.ok) {
    throw new Error(`Failed to load links.json: ${response.status}`);
  }
  return response.json();
}

/** Async computation: read the result under a `<Loading>` boundary. */
export function createLinks() {
  return createMemo(() => loadLinks());
}
