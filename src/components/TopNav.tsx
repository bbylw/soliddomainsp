import { For } from "solid-js";
import { NAV_ITEMS } from "../nav";

export default function TopNav(props: {
  activeHash: string;
  onNavigate: (event: MouseEvent, href: string) => void;
}) {
  return (
    <nav class="top-nav" aria-label="分类导航">
      <ul>
        <For each={NAV_ITEMS}>
          {(item) => (
            <li>
              <a
                href={item.href}
                classList={{ active: props.activeHash === item.href }}
                onClick={(event) => props.onNavigate(event, item.href)}
              >
                {item.label}
              </a>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}
