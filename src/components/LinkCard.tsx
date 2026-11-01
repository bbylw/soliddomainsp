import type { LinkItem } from "../types";

export default function LinkCard(props: { item: LinkItem }) {
  return (
    <a
      class="link-card"
      href={props.item.url}
      target={props.item.internal ? undefined : "_blank"}
      rel={props.item.internal ? undefined : "noopener noreferrer"}
    >
      <i class={props.item.icon} aria-hidden="true" />
      <h3>{props.item.title}</h3>
    </a>
  );
}
