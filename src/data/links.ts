import { createResource } from "solid-js";
import type { LinksData } from "../types";

async function loadLinks(): Promise<LinksData> {
  const response = await fetch("links.json");
  if (!response.ok) {
    throw new Error(`Failed to load links.json: ${response.status}`);
  }
  return response.json();
}

export function createLinksResource() {
  return createResource(loadLinks);
}
