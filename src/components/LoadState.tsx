import { Show } from "solid-js";

export default function LoadState(props: {
  loading: boolean;
  error: unknown;
  onRetry: () => void;
}) {
  return (
    <>
      <Show when={props.loading}>
        <p class="load-status" role="status">
          正在加载链接列表…
        </p>
      </Show>
      <Show when={!props.loading && props.error}>
        <p class="load-status" role="alert">
          链接列表加载失败。
          <button type="button" onClick={() => props.onRetry()}>
            重试
          </button>
        </p>
      </Show>
    </>
  );
}
