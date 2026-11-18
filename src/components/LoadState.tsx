export function LoadingState() {
  return (
    <p class="load-status" role="status">
      正在加载链接列表…
    </p>
  );
}

export function ErrorState(props: { onRetry: () => void }) {
  return (
    <p class="load-status" role="alert">
      链接列表加载失败。
      <button type="button" onClick={() => props.onRetry()}>
        重试
      </button>
    </p>
  );
}
