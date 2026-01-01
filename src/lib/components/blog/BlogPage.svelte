<script>
  import { onMount } from "svelte";
  import SiteHeader from "$lib/components/layout/SiteHeader.svelte";
  import { navLinks } from "$lib/data/nav";

  let dots = "";

  onMount(() => {
    const interval = setInterval(() => {
      dots = dots.length >= 3 ? "" : dots + ".";
    }, 500);

    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>Blog - Coming Soon</title>
</svelte:head>

<div class="page-wrapper">
  <SiteHeader links={navLinks} />

  <main class="main-content">
    <article class="coming-soon">
      <div class="ascii-art">
        <pre>{`
    ____  __    ____  ______
   / __ )/ /   / __ \\/ ____/
  / __  / /   / / / / / __  
 / /_/ / /___/ /_/ / /_/ /  
/_____/_____/\\____/\\____/   
        `}</pre>
      </div>

      <h1>Coming Soon<span class="animated-dots">{dots}</span></h1>

      <div class="status-box">
        <div class="status-line">
          <span class="status-label">[STATUS]</span>
          <span class="status-value">Under Construction</span>
        </div>
        <div class="status-line">
          <span class="status-label">[ETA]</span>
          <span class="status-value">Soon™</span>
        </div>
        <div class="status-line">
          <span class="status-label">[PROGRESS]</span>
          <span class="status-value">
            <span class="progress-bar">
              <span class="progress-fill"></span>
            </span>
            <span class="progress-text">42%</span>
          </span>
        </div>
      </div>

      <p class="message">
        In the meantime, feel free to check out my <a href="/">about page</a> or
        explore my
        <a href="https://github.com/Rayzon3" target="_blank" rel="noopener"
          >projects on GitHub</a
        >!
      </p>

      <div>
        <a href="/">Back</a>
      </div>
    </article>
  </main>
</div>

<style>
  @font-face {
    font-family: "Tamzen";
    src: url("/Tamzen7x13r.ttf") format("truetype");
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
    color: #e0def4;
    font-family: "Tamzen", ui-monospace, monospace;
    font-size: 14px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  .page-wrapper {
    --header-bg: #0d0c11;
    --header-border: none;
    --header-title-color: #e0def4;
    --header-link: #908caa;
    --header-link-hover: #e0def4;
    --header-dot: #9ccfd8;
    --header-cursor: #9ccfd8;

    display: grid;
    grid-template-columns: 280px 1fr 280px;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
    gap: 0;
  }

  /* Main Content */
  .main-content {
    grid-column: 2;
    padding: 2rem 3rem;
    max-width: 800px;
    justify-self: center;
  }

  .coming-soon {
    text-align: center;
  }

  .ascii-art {
    color: #f6c177;
    margin-bottom: 2rem;
  }

  .ascii-art pre {
    font-family: "Tamzen", ui-monospace, monospace;
    font-size: 14px;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.5rem;
    margin: 1rem 0 2rem;
    color: #c4a7e7;
  }

  .animated-dots {
    display: inline-block;
    min-width: 2ch;
  }

  .status-box {
    margin: 2rem auto;
    max-width: 400px;
    padding: 1.5rem;
    border: 1px solid #3e3a59;
    background: rgba(20, 19, 32, 0.8);
    text-align: left;
  }

  .status-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .status-label {
    color: #9ccfd8;
  }

  .status-value {
    color: #e0def4;
  }

  .progress-bar {
    display: inline-block;
    width: 100px;
    height: 10px;
    background: #26233a;
    margin-right: 0.5rem;
  }

  .progress-fill {
    display: block;
    width: 42%;
    height: 100%;
    background: #f6c177;
  }

  .message {
    margin: 2rem 0;
    color: #908caa;
  }

  .message a {
    color: #9ccfd8;
    text-decoration: none;
  }

  .message a:hover {
    text-decoration: underline;
  }
</style>
