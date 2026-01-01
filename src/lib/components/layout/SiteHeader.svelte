<script>
  export let title = "rahulbhardwaj.codes";
  export let links = [];
  export let sticky = false;
</script>

<header class:sticky class="header">
  <div class="header-left">
    <span class="status-dot"></span>
    <span class="site-title">{title}</span>
    <span class="cursor">_</span>
  </div>

  <nav class="header-nav">
    {#each links as link}
      <a
        href={link.href}
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener" : undefined}
      >
        {link.label}
      </a>
    {/each}
  </nav>
</header>

<style>
  .header {
    grid-column: 1 / -1;
    padding: 0.75rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--header-bg, #0d0c11);
    border-bottom: var(--header-border, none);
  }

  .header.sticky {
    position: sticky;
    top: 0;
    z-index: 50;
    -webkit-backdrop-filter: var(--header-backdrop, none);
    backdrop-filter: var(--header-backdrop, none);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background-color: var(--header-dot, #9ccfd8);
    border-radius: 50%;
  }

  .site-title {
    color: var(--header-title-color, #d0d0d0);
    font-weight: normal;
  }

  .header-nav {
    display: flex;
    gap: 1.5rem;
  }

  .header-nav a {
    color: var(--header-link, #908caa);
    text-decoration: none;
    transition: all 0.2s;
  }

  .header-nav a:hover {
    color: var(--header-link-hover, #d0d0d0);
    text-decoration: underline;
  }

  .cursor {
    color: var(--header-cursor, #9ccfd8);
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
</style>
