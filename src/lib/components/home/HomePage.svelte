<script>
  import { onMount } from "svelte";
  import SiteHeader from "$lib/components/layout/SiteHeader.svelte";
  import HomeContent from "$lib/components/home/HomeContent.svelte";
  import { socialLinks } from "$lib/data/nav";

  let showHeaderTitle = false;

  onMount(() => {
    const hero = document.querySelector(".hero");
    if (!(hero instanceof HTMLElement)) return;

    const updateHeaderTitle = () => {
      const headerHeight = window.innerWidth <= 640 ? 70 : 82;
      showHeaderTitle = hero.getBoundingClientRect().bottom <= headerHeight;
    };

    updateHeaderTitle();
    window.addEventListener("scroll", updateHeaderTitle, { passive: true });
    window.addEventListener("resize", updateHeaderTitle);

    return () => {
      window.removeEventListener("scroll", updateHeaderTitle);
      window.removeEventListener("resize", updateHeaderTitle);
    };
  });
</script>

<svelte:head>
  <title>Rahul Bhardwaj</title>
  <meta
    name="description"
    content="Rahul Bhardwaj is a software engineer building polished web applications, backend systems, and product interfaces."
  />
</svelte:head>

<div class="page-shell">
  <SiteHeader links={socialLinks} sticky showTitle={showHeaderTitle} />

  <main class="content-shell">
    <HomeContent />
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <!-- <p>© 2026 Rahul Bhardwaj</p> -->
      <nav aria-label="Footer">
        <a href="mailto:rahul.03111999@gmail.com">Email</a>
        <a href="https://github.com/Rayzon3" target="_blank" rel="noopener"
          >GitHub</a
        >
        <a
          href="https://linkedin.com/in/rahulbhardwaj03"
          target="_blank"
          rel="noopener">LinkedIn</a
        >
        <a href="https://x.com/BlackKatana9" target="_blank" rel="noopener">X</a
        >
        <a href="/rss.xml" target="_blank" rel="noopener">RSS</a>
      </nav>
    </div>
  </footer>
</div>

<style>
  :global(:root) {
    --bg: #0f0e13;
    --panel: #121017;
    --text: #f4f1f4;
    --soft: #b7b1bb;
    --muted: #918895;
    --accent: #e99fc7;
    --border: rgba(145, 136, 149, 0.2);
    --border-strong: rgba(145, 136, 149, 0.34);
  }

  :global(::selection) {
    background: rgba(233, 159, 199, 0.32);
    color: var(--text);
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
    background: #07060a;
  }

  :global(body) {
    margin: 0;
    min-width: 320px;
    background: #07060a;
    color: var(--text);
    font-family: "Instrument Sans", system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    overflow-x: hidden;
  }

  :global(button),
  :global(input),
  :global(textarea),
  :global(select) {
    font: inherit;
  }

  .page-shell {
    min-height: 100vh;
    background: var(--bg);
    border: 1px solid rgba(79, 72, 103, 0.5);
    border-radius: 8px;
    overflow: clip;
  }

  .content-shell {
    width: min(100% - 2rem, 1120px);
    margin: 0 auto;
  }

  .site-footer {
    border-top: 1px solid var(--border);
  }

  .footer-inner {
    width: min(100% - 2rem, 1120px);
    min-height: 120px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    color: var(--muted);
    font-size: 0.9rem;
  }

  .footer-inner nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
  }

  .footer-inner a {
    color: var(--muted);
    text-decoration: none;
  }

  .footer-inner a:hover {
    color: var(--accent);
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: currentColor;
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.18em;
  }

  @media (max-width: 720px) {
    .page-shell {
      border-radius: 0;
      border-left: 0;
      border-right: 0;
    }

    .footer-inner {
      min-height: 150px;
      display: block;
      padding: 2.5rem 0;
    }

    .footer-inner nav {
      margin-top: 1rem;
    }
  }
</style>
