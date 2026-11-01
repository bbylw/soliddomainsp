export default function SiteHeader(props: { linked?: boolean }) {
  return (
    <header>
      <h1>
        {props.linked ? <a href="index.html">WebNav Hub</a> : "WebNav Hub"}
      </h1>
    </header>
  );
}
