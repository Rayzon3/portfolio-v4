<script>
  /**
   * @typedef {"GitHub" | "LinkedIn" | "X" | "RSS"} IconLabel
   * @typedef {{
   *   href: string;
   *   label: string;
   *   external?: boolean;
   *   icon?: boolean;
   * }} HeaderLink
   */

  export let title = "Rahul Bhardwaj";
  /** @type {HeaderLink[]} */
  export let links = [];
  export let sticky = false;
  export let showTitle = true;

  /** @type {Record<IconLabel, string>} */
  const iconPaths = {
    GitHub:
      "M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.43 7.88 10.96.58.1.79-.25.79-.56v-2.15c-3.2.7-3.88-1.37-3.88-1.37-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.18 1.18A11 11 0 0 1 12 6.06c.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.12c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
    LinkedIn:
      "M4.98 3.5A2.48 2.48 0 1 1 0 3.5a2.48 2.48 0 0 1 4.98 0ZM.44 8.04h4.08V23H.44V8.04Zm7.12 0h3.9v2.04h.06c.54-1.03 1.87-2.12 3.86-2.12 4.13 0 4.9 2.72 4.9 6.26V23h-4.08v-7.78c0-1.86-.03-4.24-2.58-4.24-2.59 0-2.99 2.02-2.99 4.1V23H7.56V8.04Z",
    X: "M18.9 1.5h3.7l-8.08 9.23L24 23.5h-7.42l-5.8-7.6-6.65 7.6H.43l8.64-9.88L0 1.5h7.6l5.25 6.94L18.9 1.5Zm-1.3 19.75h2.05L6.48 3.63H4.28L17.6 21.25Z",
    RSS: "M4.33 18.34a2.83 2.83 0 1 1 0 5.66 2.83 2.83 0 0 1 0-5.66ZM1.1 8.27C9.22 8.27 15.73 14.78 15.73 22.9H11.7c0-5.89-4.72-10.61-10.6-10.61V8.27ZM1.1 0C13.8 0 24 10.2 24 22.9h-4.04c0-10.47-8.39-18.86-18.86-18.86V0Z",
  };

  /**
   * @param {string} label
   * @returns {label is IconLabel}
   */
  function hasIcon(label) {
    return label in iconPaths;
  }
</script>

<header class:sticky class="site-header">
  <div class="header-inner">
    <a
      class="brand"
      class:visible={showTitle}
      href="/"
      aria-hidden={!showTitle}
      tabindex={showTitle ? undefined : -1}>{title}</a
    >

    <nav class="header-nav" aria-label="Primary">
      {#each links as link}
        <a
          class:icon-link={link.icon}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener" : undefined}
          aria-label={link.label}
          title={link.label}
        >
          {#if link.icon && hasIcon(link.label)}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={iconPaths[link.label]} />
            </svg>
          {:else}
            {link.label}
          {/if}
        </a>
      {/each}
    </nav>
  </div>
</header>

<style>
  .site-header {
    border-bottom: 1px solid var(--border);
    background: rgba(14, 13, 18, 0.86);
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);
  }

  .site-header.sticky {
    position: sticky;
    top: 0;
    z-index: 20;
  }

  .header-inner {
    width: min(100% - 2rem, 1120px);
    height: 82px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand {
    color: var(--text);
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 1.3rem;
    font-weight: 400;
    text-decoration: none;
    opacity: 0;
    pointer-events: none;
    transform: translateY(0.25rem);
    transition:
      opacity 180ms ease,
      transform 180ms ease;
  }

  .brand.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .header-nav {
    display: flex;
    align-items: center;
    gap: 1.35rem;
  }

  .header-nav a {
    color: var(--muted);
    font-size: 0.84rem;
    text-decoration: none;
    transition: color 160ms ease;
  }

  .header-nav a:hover {
    color: var(--text);
  }

  .icon-link {
    width: 24px;
    height: 24px;
    display: inline-grid;
    place-items: center;
  }

  .icon-link svg {
    width: 15px;
    height: 15px;
    fill: currentColor;
  }

  @media (max-width: 640px) {
    .header-inner {
      height: 70px;
    }

    .header-nav {
      gap: 0.8rem;
    }
  }
</style>
