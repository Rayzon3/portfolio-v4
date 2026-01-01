<script>
  import { onMount } from "svelte";
  import SiteHeader from "$lib/components/layout/SiteHeader.svelte";
  import HomeContent from "$lib/components/home/HomeContent.svelte";
  import HomeSidebar from "$lib/components/home/HomeSidebar.svelte";
  import { tocItems } from "$lib/data/home";
  import { navLinks } from "$lib/data/nav";

  /**
   * @type {string | null}
   */
  let viewerId = null;

  let activeSiteWide = 0;
  let activeThisPage = 0;
  let totalViewsThisPage = 0;

  // Rahul Online/Offline
  let rahulOnline = false;

  /**
   * @type {number | undefined}
   */
  let heartbeatTimer;

  // ---- TOC active state ----
  let activeSectionId = "hello";

  function getIsOwner() {
    const params = new URLSearchParams(window.location.search);
    return params.get("me") === "1";
  }

  function getStoredViewerId() {
    return localStorage.getItem("rb_viewer_id");
  }

  /**
   * @param {string | null} id
   */
  function storeViewerId(id) {
    if (!id) return;
    localStorage.setItem("rb_viewer_id", id);
  }

  /**
   * @param {string} pathname
   */
  function wasCountedForPath(pathname) {
    return localStorage.getItem(`rb_counted:${pathname}`) === "1";
  }

  /**
   * @param {string} pathname
   */
  function markCountedForPath(pathname) {
    localStorage.setItem(`rb_counted:${pathname}`, "1");
  }

  async function pingPresence() {
    const pathname = window.location.pathname;

    // stable id across reloads
    if (!viewerId) viewerId = getStoredViewerId();

    // only count view once per browser per path
    const shouldCountView = !wasCountedForPath(pathname);

    const res = await fetch("/api/presence", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        viewerId,
        shouldCountView,
        isOwner: getIsOwner(),
      }),
    });

    if (!res.ok) return;

    const data = await res.json();

    viewerId = data.viewerId;
    storeViewerId(viewerId);

    activeSiteWide = data.activeSiteWide;
    activeThisPage = data.activeThisPage;
    totalViewsThisPage = data.totalViewsThisPage ?? totalViewsThisPage;

    rahulOnline = data.ownerOnline === true;

    // after server confirms, lock the "count once" flag
    if (shouldCountView) markCountedForPath(pathname);
  }

  /**
   * @param {string} id
   */
  function setActiveToc(id) {
    activeSectionId = id;
  }

  onMount(() => {
    // --- presence ---
    pingPresence();
    heartbeatTimer = setInterval(pingPresence, 15_000);

    const handleScroll = () => {
      if (window.scrollY <= 1) {
        setActiveToc("hello");
        return;
      }

      const { scrollHeight } = document.documentElement;
      const nearBottom = window.scrollY + window.innerHeight >= scrollHeight - 2;

      if (nearBottom) setActiveToc("contact");
    };

    // --- TOC observer ---
    const ids = tocItems.map((item) => item.id);

    /** @type {HTMLElement[]} */
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);

    // initial highlight
    setActiveToc(activeSectionId);

    const observer = new IntersectionObserver(
      (entries) => {
        // pick best visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) setActiveToc(visible.target.id);
      },
      {
        // account for sticky header
        root: null,
        rootMargin: "-90px 0px -60% 0px",
        threshold: [0.15, 0.25, 0.35, 0.5],
      }
    );

    sections.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearInterval(heartbeatTimer);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<svelte:head>
  <title>Ahoy!</title>
  <link rel="icon" type="image/png" href="/IMG_3603.png" />
</svelte:head>

<div class="page-wrapper">
  <div id="hello" class="toc-anchor" aria-hidden="true"></div>
  <SiteHeader links={navLinks} sticky />

  <main class="layout">
    <HomeContent />
    <HomeSidebar
      {rahulOnline}
      {activeSiteWide}
      {activeThisPage}
      {activeSectionId}
    />
  </main>
</div>

<style>
  :global(::selection) {
    background: rgba(173, 118, 241, 0.35);
    color: #d0d0d0;
  }
  :global(::-moz-selection) {
    background: rgba(173, 118, 241, 0.35);
    color: #d0d0d0;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

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

  .page-wrapper {
    --header-bg: rgba(13, 12, 17, 0.55);
    --header-border: 1px solid rgba(38, 35, 58, 0.8);
    --header-backdrop: blur(12px);
    --header-title-color: #d0d0d0;
    --header-link: #908caa;
    --header-link-hover: #d0d0d0;
    --header-dot: #9ccfd8;
    --header-cursor: #9ccfd8;

    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr minmax(0, 780px) 320px 1fr;
    grid-template-rows: auto 1fr;
    gap: 0;
  }

  .layout {
    grid-column: 2 / 4;
    display: grid;
    grid-template-columns: minmax(0, 780px) 320px;
    gap: 3rem;
    padding: 2rem 1.5rem;
    align-items: start;
  }

  .toc-anchor {
    height: 1px;
    width: 100%;
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .page-wrapper {
      grid-template-columns: 1fr minmax(0, 720px) 300px 1fr;
    }
  }

  @media (max-width: 980px) {
    .page-wrapper {
      grid-template-columns: 1fr;
    }

    .layout {
      grid-column: 1;
      grid-template-columns: 1fr;
      padding: 2rem 1.25rem;
    }
  }
</style>
