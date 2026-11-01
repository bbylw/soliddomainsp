export default function SiteFooter() {
  return (
    <footer>
      <p>
        © <span id="year">{new Date().getFullYear()}</span> WebNav Hub. 保留所有权利。
      </p>
      <nav aria-label="页脚导航">
        <a href="#" onClick={(event) => event.preventDefault()}>
          隐私政策
        </a>{" "}
        <a href="#" onClick={(event) => event.preventDefault()}>
          使用条款
        </a>{" "}
        <a href="#" onClick={(event) => event.preventDefault()}>
          联系我们
        </a>
      </nav>
    </footer>
  );
}
