<script>
  let email = "your.email@example.com";
  let name = "Rahul";
  let title = "Software Engineer";
  let location = "Gurgaon, India";

  const technologies1 = [
    "React",
    "React Query",
    "Next.js",
    "Node.js",
    "Prisma",
    "PostgreSQL",
    "AWS Lambda",
    "EventBridge",
    "MapBox",
    "Docker",
    "GitHub Actions",
    "JWT/RBAC",
  ];

  const technologies2 = ["React", "Node.js", "PostgreSQL", "Prisma"];

  const technologies3 = [
    "Node.js",
    "Prisma",
    "PostgreSQL",
    "AWS EC2",
    "GitHub Actions",
  ];

  import { onMount } from "svelte";

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

  onMount(() => {
    pingPresence();
    heartbeatTimer = setInterval(pingPresence, 15_000);
    return () => clearInterval(heartbeatTimer);
  });
</script>

<svelte:head>
  <title>Ahoy!</title>
  <link rel="icon" type="image/png" href="/IMG_3603.png" />
</svelte:head>

<div class="page-wrapper">
  <!-- TOP HEADER (sticky + frosted) -->
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

  <main class="layout">
    <!-- LEFT: content column -->
    <section class="content">
      <article>
        <div class="post-meta">
          <span class="label">Hello, world!</span>
          <span class="meta-text">#ahoy</span>
        </div>
        <div class="post-date">
          Last updated December 28 2025, 08:29:00<br />
          Approx. 2 minute read
        </div>

        <p id="hello">Ahoy!! I'm <code class="inline-code">{name}</code>!</p>

        <p>
          I'm currently a <code class="inline-code">{title}</code> based in
          <span class="highlight">{location}</span>
          trying to create great software experiences!
        </p>

        <p>I usually work with Typescript, NodeJs and React.</p>

        <p>
          In my spare time I enjoy playing guitar, gaming and watching anime.
        </p>

        <h2 id="background">Background</h2>

        <p>
          I'm a self-taught developer who started programming in high school.
          Initially i was interested in making games(did make a few in godot and
          pygame).
        </p>

        <p>
          My passion for game dev is still alive and am improving my pixel art
          skills!
        </p>

        <p>
          In all these years i have dabbled in a variety of languages and
          frameworks, primarily focused on web development or systems
          programming.
        </p>

        <p>Nowadays, my go-to tech stack includes:</p>

        <ul>
          <li>React</li>
          <li>Svelte</li>
          <li>PostgreSQL or SQLite</li>
          <li>Elixir</li>
          <li>Go</li>
          <li>Tailwind CSS</li>
        </ul>

        <p>
          I've been a longtime member of the ricing community, which still
          regularly inspires me to optimize my workflow and environment.
        </p>

        <h2 id="experience">Experience</h2>

        <div class="experience-item">
          <div class="experience-header">
            <div class="experience-period">
              <span>June 2023 – Present</span>
            </div>
          </div>

          <h3 class="job-title">Software Development Engineer</h3>
          <div class="company-info">
            <span class="company-name">Byteridge</span>
          </div>

          <ul class="achievements">
            <li>
              Delivered end-to-end features as IC across multiple web apps.
            </li>
            <li>Refactored React bundles (~10%) → page loads +20%.</li>
            <li>
              State revamp with React Query + useReducer (~20% re-renders).
            </li>
            <li>
              Node.js + Prisma APIs with &lt;200ms p95 @ 1k+ daily concurrents.
            </li>
            <li>
              Serverless email scheduler (Lambda + EventBridge): 500+ mails/day.
            </li>
            <li>Next.js + MapBox geospatial filters for 200+ daily users.</li>
            <li>
              JWT-based RBAC across 5 microservices; passed security audits.
            </li>
            <li>CI/CD automation with Docker + GitHub Actions.</li>
          </ul>

          <div class="tech-tags">
            {#each technologies1 as tech}
              <code class="inline-code-tech_tag">{tech}</code>
            {/each}
          </div>
        </div>

        <div class="experience-item">
          <div class="experience-header">
            <div class="experience-period">
              <span>Feb 2023 – June 2023</span>
            </div>
          </div>

          <h3 class="job-title">Software Development Engineer Intern</h3>
          <div class="company-info">
            <span class="company-name">Byteridge</span>
          </div>

          <ul class="achievements">
            <li>Redesigned internal tool UI in React.</li>
            <li>Optimized Node.js + PostgreSQL APIs (~40% response time).</li>
          </ul>

          <div class="tech-tags">
            {#each technologies2 as tech}
              <code class="inline-code-tech_tag">{tech}</code>
            {/each}
          </div>
        </div>

        <div class="experience-item">
          <div class="experience-header">
            <div class="experience-period">
              <span>Aug 2022 – Jan 2023</span>
            </div>
          </div>

          <h3 class="job-title">Backend Developer Intern</h3>
          <div class="company-info">
            <span class="company-name">Zvyka</span>
          </div>

          <ul class="achievements">
            <li>Designed scalable backend with Node.js, Prisma, PostgreSQL.</li>
            <li>Built & tested REST APIs; production hardening.</li>
            <li>AWS EC2 deployments with robust CI/CD.</li>
          </ul>

          <div class="tech-tags">
            {#each technologies3 as tech}
              <code class="inline-code-tech_tag">{tech}</code>
            {/each}
          </div>
        </div>

        <h2 id="blog-projects">Blog &amp; Projects</h2>

        <p>
          You can check out my writings on various topics on my <a href="/blog"
            >blog</a
          >.
        </p>

        <p>
          You can additionally see a list of <a
            href="https://github.com/Rayzon3">projects</a
          >
          I've worked on or contributed to.
        </p>

        <h2 id="contact">Contact</h2>

        <p>
          I try to go by <code class="inline-code">Rayzon</code> on most platforms,
          you can find me on:
        </p>

        <ul>
          <li>
            <a href="https://github.com/Rayzon3" target="_blank" rel="noopener"
              >GitHub</a
            >
          </li>
          <li>
            <a href="https://x.com/BlackKatana9" target="_blank" rel="noopener"
              >Twitter</a
            >
          </li>
        </ul>

        <p>
          In cases where <code class="inline-code">Rayzon</code> is not available,
          you can find me here:
        </p>

        <ul>
          <li>
            <a
              href="https://linkedin.com/in/rahulbhardwaj03"
              target="_blank"
              rel="noopener">LinkedIn</a
            >
          </li>
        </ul>

        <p>
          Feel free to reach out to me via <a href="mailto:{email}">email</a> or
          any of the platforms above if you want to chat!
        </p>

        <div class="sticky-footer">
          <div class="post-footer-links">
            <a
              href="/rss.xml"
              class="footer-chip"
              target="_blank"
              rel="noopener"
            >
              RSS
            </a>

            <a
              href="https://github.com/Rayzon3/portfolio-v4"
              class="footer-chip"
              target="_blank"
              rel="noopener"
            >
              Source
            </a>
          </div>
        </div>
      </article>
    </section>

    <!-- RIGHT: sidebar column -->
    <aside class="sidebar">
      <div class="side-section">
        <div class="side-title">▼ Presence</div>
        <div class="side-row">• Rahul {rahulOnline ? "Online" : "Offline"}</div>
      </div>

      <div class="side-section">
        <div class="side-title">▼ Viewers</div>
        <div class="side-row">• Site-wide: {activeSiteWide}</div>
        <div class="side-row">• This page: {activeThisPage}</div>
      </div>

      <div class="side-section">
        <div class="side-title">▼ Table of Contents</div>
        <a class="toc-link" href="#hello"># Hello, world!</a>
        <a class="toc-link" href="#background">## Background</a>
        <a class="toc-link" href="#experience">## Experience</a>
        <a class="toc-link" href="#blog-projects">## Blog &amp; Projects</a>
        <a class="toc-link" href="#contact">## Contact</a>
      </div>
    </aside>
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
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr minmax(0, 780px) 320px 1fr;
    grid-template-rows: auto 1fr;
    gap: 0;
  }

  /* Header */
  .header {
    grid-column: 1 / -1;

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
    color: #d0d0d0;
    text-decoration: underline;
  }

  /* ✅ NEW: layout spans content+sidebar columns */
  .layout {
    grid-column: 2 / 4;
    display: grid;
    grid-template-columns: minmax(0, 780px) 320px;
    gap: 3rem;
    padding: 2rem 1.5rem;
    align-items: start;
  }

  .content {
    min-width: 0;
  }

  /* ✅ Sticky sidebar */
  .sidebar {
    position: sticky;
    top: 4.25rem; /* below header */
    align-self: start;
  }

  .side-section {
    margin-bottom: 1.5rem;
  }

  .side-title {
    color: #6e6a86;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #26233a;
    padding-bottom: 0.4rem;
  }

  .side-row {
    color: #908caa;
    padding: 0.35rem 0;
    display: flex;
    gap: 0.6rem;
    align-items: center;
  }

  .toc-link {
    display: block;
    color: #9ccfd8;
    text-decoration: none;
    padding: 0.25rem 0;
  }

  .toc-link:hover {
    color: #ebbcba;
    text-decoration: underline;
  }

  article {
    animation: fadeIn 0.3s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .post-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .label {
    background-color: #31748f;
    color: #191724;
    padding: 0.15rem 0.5rem;
    font-size: 12px;
    font-weight: bold;
  }

  .meta-text {
    color: #9ccfd8;
    font-size: 12px;
    font-style: italic;
  }

  .post-date {
    color: #6e6a86;
    font-size: 12px;
    margin-bottom: 2rem;
    line-height: 1.4;
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

  h3 {
    font-size: 1.5rem;
    font-weight: normal;
    margin: 1.5rem 0 1rem 0;
    color: #d0d0d0;
    line-height: 1.3;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
    color: #31748f;
    line-height: 1.3;
  }

  p {
    margin: 0.75rem 0;
    color: #d0d0d0;
  }

  .highlight {
    color: #c4a7e7;
  }

  a {
    color: #9ccfd8;
    text-decoration: none;
    transition: all 0.2s;
    font-weight: 400;
  }

  a:hover {
    color: #ebbcba;
    text-decoration: underline;
  }

  ul {
    list-style: none;
    padding-left: 0;
    margin: 0.75rem 0;
  }

  li {
    padding: 0.2rem 0;
    padding-left: 1.2rem;
    position: relative;
  }

  li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #908caa;
  }

  .inline-code {
    background-color: #26233a;
    color: #ec6f93;
    padding: 0.1rem 0.3rem;
    font-size: 0.95em;
    font-family: inherit;
  }

  .inline-code-tech_tag {
    background-color: #26233a;
    color: #ea9a97;
    padding: 0.1rem 0.3rem;
    font-size: 0.95em;
    font-family: inherit;
  }

  .experience-item {
    margin: 2rem 0;
    padding-bottom: 2rem;
    border-bottom: 1px solid #26233a;
  }

  .experience-item:last-of-type {
    border-bottom: none;
  }

  .experience-header {
    margin-bottom: 0.75rem;
  }

  .experience-period {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6e6a86;
    font-size: 13px;
  }

  .job-title {
    font-size: 1.3rem;
    font-weight: normal;
    margin: 0.5rem 0;
    color: #d0d0d0;
  }

  .company-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .company-name {
    color: #9ccfd8;
    font-weight: normal;
  }

  .achievements {
    margin: 1rem 0;
  }

  .achievements li {
    margin: 0.5rem 0;
    color: #d0d0d0;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
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

    .sidebar {
      position: relative;
      top: 0;
    }
  }

  /* Sticky footer container */
  /* Sticky footer with frosted glass */
  .sticky-footer {
    position: sticky;
    bottom: 0;
    z-index: 30;

    background: rgba(13, 12, 17, 0.6);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);

    border-top: 1px solid rgba(38, 35, 58, 0.8);

    padding-bottom: env(safe-area-inset-bottom);
  }

  /* Footer links */
  .post-footer-links {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0.75rem 0;
    border-top: 1px solid #26233a;
  }

  /* Buttons */
  .footer-chip {
    background-color: #6c77ff;
    color: #0d0c11;
    font-size: 12px;
    font-weight: 700;
    padding: 0.35rem 0.75rem;
    font-family: inherit;
    text-decoration: none;
    border-radius: 2px;
    transition: all 0.15s ease;
  }

  /* Ensure content isn't hidden behind footer */
  article {
    padding-bottom: 4rem;
  }

  /* Mobile polish */
  @media (max-width: 640px) {
    .post-footer-links {
      padding: 0.9rem 0;
    }
  }
</style>
