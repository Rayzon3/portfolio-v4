<script>
  import { page } from "$app/stores";

  $: status = $page.status;
  $: is404 = status === 404;

  $: title = is404 ? "404 — Not Found" : `${status} — Error`;
  $: msg = is404
    ? "The page you’re looking for doesn’t exist (or got riced away)."
    : "Something went wrong. Try again or go home.";
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="wrap">
  <!-- Sticky frosted header (same style family as your main page) -->
  <header class="header">
    <div class="header-left">
      <span class="status-dot"></span>
      <span class="site-title">rahulbhardwaj.codes</span>
      <span class="cursor">_</span>
    </div>

    <nav class="header-nav">
      <a href="/">about</a>
      <a href="/blog">blog</a>
      <a href="https://github.com/Rayzon3">projects</a>
    </nav>
  </header>

  <main class="content">
    <div class="card">
      <div class="meta">
        <span class="label"
          >{is404 ? "Lost in /dev/null" : "Unhandled exception"}</span
        >
        <span class="meta-text">#{status}</span>
      </div>

      <h1>{title}</h1>

      <p class="desc">{msg}</p>

      <div class="terminal">
        <div class="term-line">
          <span class="prompt">rayzon@portfolio</span><span class="sep">:</span
          ><span class="path">~</span><span class="sep">$</span>
          <span class="cmd">ls</span>
        </div>
        <div class="term-out">about/ blog/ projects/ rss.xml</div>

        <div class="term-line">
          <span class="prompt">rayzon@portfolio</span><span class="sep">:</span
          ><span class="path">~</span><span class="sep">$</span>
          <span class="cmd">cd {is404 ? "nowhere" : "home"}</span>
        </div>
        <div class="term-out dim">
          {is404 ? "cd: nowhere: No such file or directory" : "ok"}
        </div>
      </div>

      <div class="actions">
        <a class="btn primary" href="/">← Home</a>
        <a class="btn" href="/blog">Blog</a>
        <a
          class="btn"
          href="https://github.com/Rayzon3"
          target="_blank"
          rel="noopener">GitHub</a
        >
      </div>

      {#if !is404}
        <div class="small">
          If this keeps happening, check the console / server logs.
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
  @font-face {
    font-family: "MapleMono";
    src: url("/MapleMono-NF-Base-Mono.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #0d0c11;
    color: #d0d0d0;
    font-family: "MapleMono", ui-monospace, monospace;
    font-size: 14px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  .wrap {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  /* Header (frosted) */
  .header {
    position: sticky;
    top: 0;
    z-index: 50;

    background: rgba(13, 12, 17, 0.55);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);

    border-bottom: 1px solid rgba(38, 35, 58, 0.8);

    padding: 0.75rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background-color: #9ccfd8;
    border-radius: 50%;
  }

  .site-title {
    color: #d0d0d0;
    font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 55vw;
  }

  .cursor {
    color: #9ccfd8;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }

  .header-nav {
    display: flex;
    gap: 1.25rem;
  }

  .header-nav a {
    color: #908caa;
    text-decoration: none;
    transition: all 0.2s;
  }

  .header-nav a:hover {
    color: #d0d0d0;
    text-decoration: underline;
  }

  /* Main */
  .content {
    display: grid;
    place-items: center;
    padding: 2.25rem 1.5rem;
  }

  .card {
    width: min(860px, 100%);
    border: 1px solid #26233a;
    background: rgba(13, 12, 17, 0.35);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
  }

  .meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .label {
    background-color: #31748f;
    color: #191724;
    padding: 0.15rem 0.5rem;
    font-size: 12px;
    font-weight: 700;
  }

  .meta-text {
    color: #9ccfd8;
    font-size: 12px;
    font-style: italic;
  }

  h1 {
    margin: 0.25rem 0 0.75rem 0;
    font-size: 1.6rem;
    font-weight: 600;
    color: #d0d0d0;
    line-height: 1.25;
  }

  .desc {
    margin: 0 0 1.25rem 0;
    color: #d0d0d0;
  }

  .terminal {
    border: 1px solid #26233a;
    background: #0d0c11;
    padding: 0.9rem;
    margin: 1rem 0 1.25rem 0;
  }

  .term-line {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    color: #d0d0d0;
  }

  .prompt {
    color: #9ccfd8;
  }
  .path {
    color: #c4a7e7;
  }
  .sep {
    color: #6e6a86;
  }
  .cmd {
    color: #ebbcba;
  }

  .term-out {
    margin: 0.35rem 0 0.8rem 0;
    color: #908caa;
  }
  .dim {
    color: #6e6a86;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 0.25rem;
  }

  .btn {
    border: 1px solid #26233a;
    padding: 0.45rem 0.75rem;
    color: #9ccfd8;
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .btn:hover {
    color: #ebbcba;
    border-color: #6e6a86;
  }

  .primary {
    background: #6c77ff;
    color: #0d0c11;
    border-color: transparent;
    font-weight: 700;
  }

  .primary:hover {
    color: #0d0c11;
    filter: brightness(1.05);
  }

  .small {
    margin-top: 1rem;
    font-size: 12px;
    color: #6e6a86;
  }

  /* Mobile */
  @media (max-width: 640px) {
    .header {
      padding: 0.7rem 1rem;
      gap: 0.75rem;
    }
    .header-nav {
      gap: 0.9rem;
    }
    .content {
      padding: 1.75rem 1rem;
    }
    .card {
      padding: 1.1rem;
    }
    h1 {
      font-size: 1.35rem;
    }
  }
</style>
