<script>
  import { onMount } from "svelte";

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

  .page-wrapper {
    display: grid;
    grid-template-columns: 280px 1fr 280px;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
    gap: 0;
  }

  /* Header */
  .header {
    grid-column: 1 / -1;
    background-color: #0d0c11;
    padding: 0.75rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background-color: #9ccfd8;
    border-radius: 50%;
  }

  .site-title {
    color: #e0def4;
    font-weight: normal;
  }

  .header-nav {
    display: flex;
    gap: 1.5rem;
  }

  .header-nav a {
    color: #908caa;
    text-decoration: none;
    transition: all 0.2s;
  }

  .header-nav a:hover {
    color: #e0def4;
    text-decoration: underline;
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
    animation: fadeIn 0.5s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .ascii-art {
    margin: 2rem 0;
    overflow-x: auto;
  }

  .ascii-art pre {
    color: #9ccfd8;
    font-size: 12px;
    line-height: 1.2;
    margin: 0;
    display: inline-block;
    text-align: left;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: normal;
    margin: 2rem 0 1rem 0;
    color: #ebbcba;
    line-height: 1.2;
  }

  .animated-dots {
    display: inline-block;
    width: 1.5rem;
    text-align: left;
  }

  .status-box {
    background-color: #1f1d2e;
    border: 1px solid #26233a;
    border-radius: 4px;
    padding: 1.5rem;
    margin: 2rem 0;
    text-align: left;
  }

  .status-line {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0.75rem 0;
  }

  .status-label {
    color: #31748f;
    font-weight: bold;
    min-width: 100px;
  }

  .status-value {
    color: #e0def4;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
  }

  .progress-bar {
    flex: 1;
    height: 20px;
    background-color: #26233a;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
  }

  .progress-fill {
    display: block;
    height: 100%;
    width: 42%;
    background: linear-gradient(90deg, #31748f, #9ccfd8);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  .progress-text {
    color: #9ccfd8;
    min-width: 40px;
  }

  .message {
    font-size: 1rem;
    color: #e0def4;
    margin: 2rem 0;
    line-height: 1.6;
  }

  .message a {
    color: #9ccfd8;
    text-decoration: none;
    transition: all 0.2s;
  }

  .message a:hover {
    color: #ebbcba;
    text-decoration: underline;
  }

  a {
    color: #9ccfd8;
    text-decoration: none;
    transition: all 0.2s;
  }

  a:hover {
    color: #ebbcba;
    text-decoration: underline;
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .page-wrapper {
      grid-template-columns: 200px 1fr 240px;
    }
  }

  @media (max-width: 900px) {
    .page-wrapper {
      grid-template-columns: 1fr;
    }

    .main-content {
      grid-column: 1;
      padding: 2rem 1.5rem;
      justify-self: start;
    }

    h1 {
      font-size: 2rem;
    }

    .ascii-art pre {
      font-size: 10px;
    }

    .status-line {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .status-label {
      min-width: auto;
    }

    .status-value {
      width: 100%;
    }
  }
</style>
