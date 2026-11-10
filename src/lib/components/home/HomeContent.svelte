<script>
  import { onMount } from "svelte";
  import { blogPosts } from "$lib/data/blog";
  import { experiences, profile, stackList } from "$lib/data/home";

  let expandedExperiences = new Set();

  const highlights = [
    "TypeScript",
    "Node.js",
    "React",
    "Svelte",
    "Elixir",
    "Go",
  ];

  const projects = [
    {
      title: "AI Incident Commander",
      href: "https://github.com/Rayzon3/incidentCommander",
      stack: ["Elixir", "Phoenix LiveView", "Python", "FastAPI", "pgvector"],
      summary:
        "Agentic incident diagnosis platform with realtime dashboards, async event pipelines, log summarization, root-cause analysis, vector embeddings, and RAG-based incident similarity search.",
    },
    {
      title: "Real-Time Collaboration Platform",
      href: "https://github.com/Rayzon3/jabber_v3",
      stack: ["React", "TypeScript", "Node.js", "WebSockets", "Kubernetes"],
      summary:
        "Realtime collaboration system with scalable WebSocket communication, concurrent synchronization, reusable React components, and optimized shared-state patterns.",
    },
    {
      title: "A* Algorithm Visualizer",
      href: "https://github.com/Rayzon3/pathfinder",
      stack: ["TypeScript", "Next.js", "Tailwind CSS"],
      summary:
        "Interactive pathfinding visualizer with optimized rendering and animated traversal updates for exploring A* search behavior.",
    },
  ];

  const sectionLinks = [
    { href: "#experience", label: "Experience", icon: "/sword_01.png" },
    { href: "#projects", label: "Projects", icon: "/wooden_box.png" },
    { href: "#writing", label: "Writing", icon: "/book.png" },
    { href: "#contact", label: "Contact", icon: "/feather_a.png" },
  ];

  /** @type {HTMLElement | undefined} */
  let quickLinks;
  let showFloatingLinks = false;
  let mobileMenuOpen = false;
  let isMobile = false;

  $: dockInteractive =
    showFloatingLinks && (!isMobile || mobileMenuOpen);

  onMount(() => {
    const updateFloatingLinks = () => {
      if (!quickLinks) return;
      isMobile = window.innerWidth <= 760;
      const headerOffset = window.innerWidth <= 640 ? 78 : 94;
      showFloatingLinks =
        quickLinks.getBoundingClientRect().bottom <= headerOffset;
      if (!showFloatingLinks) mobileMenuOpen = false;
    };

    updateFloatingLinks();
    window.addEventListener("scroll", updateFloatingLinks, { passive: true });
    window.addEventListener("resize", updateFloatingLinks);

    return () => {
      window.removeEventListener("scroll", updateFloatingLinks);
      window.removeEventListener("resize", updateFloatingLinks);
    };
  });
</script>

<section class="hero" aria-labelledby="intro-title">
  <div class="hero-copy">
    <h1 id="intro-title">{profile.name} Bhardwaj</h1>

    <p class="lede">
      Software engineer building practical, polished software across web
      applications and backend systems.
    </p>

    <p class="intro">
      I am a {profile.title} based in <a href="#contact">{profile.location}</a>.
      I work mostly with <span class="inline-accent-teal">TypeScript</span>,
      <span class="inline-accent-teal">Node.js</span>,
      <span class="inline-accent-teal">React</span>, and
      <span class="inline-accent-teal">Svelte</span>, with a growing interest in
      <span class="inline-accent-teal">Elixir</span>,
      <span class="inline-accent-teal">Go</span>, and low-level programming.
    </p>

    <div bind:this={quickLinks} class="quick-links" aria-label="Portfolio sections">
      {#each sectionLinks as link}
        <a href={link.href}>
          <img src={link.icon} alt="" aria-hidden="true" />
          {link.label}
        </a>
      {/each}
    </div>
  </div>
</section>

<nav
  id="section-dock"
  class="floating-links"
  class:visible={showFloatingLinks}
  class:open={mobileMenuOpen}
  aria-label="Portfolio sections"
  aria-hidden={!dockInteractive}
>
  {#each sectionLinks as link}
    <a
      href={link.href}
      tabindex={dockInteractive ? undefined : -1}
      onclick={() => (mobileMenuOpen = false)}
    >
      <img src={link.icon} alt="" aria-hidden="true" />
      <span>{link.label}</span>
    </a>
  {/each}
</nav>

<button
  class="dock-toggle"
  class:visible={showFloatingLinks}
  type="button"
  onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
  aria-label={mobileMenuOpen ? "Close section menu" : "Open section menu"}
  aria-expanded={mobileMenuOpen}
  aria-controls="section-dock"
  tabindex={showFloatingLinks && isMobile ? undefined : -1}
>
  <img src="/compass.png" alt="" aria-hidden="true" />
</button>

<section id="experience" class="section-block">
  <div class="section-heading">
    <h2>Experience</h2>
  </div>

  <div class="rows">
    {#each experiences as experience, index}
      <article class="row">
        <div class="row-meta">
          <span>{experience.period}</span>
          <span>{experience.company} · {experience.location}</span>
        </div>

        <div class="row-main">
          <h3>{experience.role}</h3>
          <div id={`experience-achievements-${index}`} hidden={!expandedExperiences.has(index)}>
            <ul class="achievements">
              {#each experience.achievements as achievement}
                <li>{achievement}</li>
              {/each}
            </ul>
          </div>

          <div class="tags" aria-label={`${experience.company} technologies`}>
            {#each experience.tech.slice(0, 6) as tech}
              <span>{tech}</span>
            {/each}
          </div>
        </div>

        <button
          class="experience-toggle"
          aria-label={`${expandedExperiences.has(index) ? "Hide" : "Show"} achievements for ${experience.role} at ${experience.company}`}
          aria-expanded={expandedExperiences.has(index)}
          aria-controls={`experience-achievements-${index}`}
          onclick={() => {
            const next = new Set(expandedExperiences);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            expandedExperiences = next;
          }}
        >
          <span class="row-arrow" aria-hidden="true">→</span>
        </button>
      </article>
    {/each}
  </div>
</section>

<section id="projects" class="section-block">
  <div class="section-heading">
    <h2>Projects</h2>
    <a href="https://github.com/Rayzon3" target="_blank" rel="noopener">
      GitHub
    </a>
  </div>

  <div class="rows compact">
    {#each projects as project}
      <a
        class="row project-row"
        href={project.href}
        target="_blank"
        rel="noopener"
      >
        <div class="row-meta">
          <span>Project</span>
          <span>{project.stack.slice(0, 2).join(" / ")}</span>
        </div>

        <div class="row-main">
          <h3>{project.title}</h3>
          <p>{project.summary}</p>

          <div class="tags" aria-label={`${project.title} technologies`}>
            {#each project.stack as tech}
              <span>{tech}</span>
            {/each}
          </div>
        </div>

        <span class="row-arrow" aria-hidden="true">→</span>
      </a>
    {/each}
  </div>
</section>

<section id="writing" class="section-block">
  <div class="section-heading">
    <h2>Writing</h2>
    <a href="/blog">All writing</a>
  </div>

  <div class="rows">
    {#each blogPosts as post}
      <a class="row writing-row" href={`/blog/${post.slug}`}>
        <div class="row-meta">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        <div class="row-main">
          <h3>{post.title}</h3>
          <p>{post.summary}</p>

          <div class="tags" aria-label={`${post.title} topics`}>
            {#each post.tags as tag}
              <span>{tag}</span>
            {/each}
          </div>
        </div>

        <span class="row-arrow" aria-hidden="true">→</span>
      </a>
    {/each}
  </div>
</section>

<section id="contact" class="section-block contact-block">
  <div class="section-heading">
    <h2>Contact</h2>
  </div>

  <p>
    I go by <span>Rayzon</span> around the web. Reach me by
    <a href="mailto:{profile.email}">email</a>, or find me on
    <a href="https://github.com/Rayzon3" target="_blank" rel="noopener"
      >GitHub</a
    >,
    <a
      href="https://linkedin.com/in/rahulbhardwaj03"
      target="_blank"
      rel="noopener"
    >
      LinkedIn
    </a>, and
    <a href="https://x.com/BlackKatana9" target="_blank" rel="noopener">X</a>.
  </p>

  <div class="highlight-strip" aria-label="Core skills">
    {#each highlights as item}
      <span>{item}</span>
    {/each}
  </div>
</section>

<style>
  .hero {
    min-height: calc(100vh - 83px);
    display: grid;
    align-items: center;
    padding: clamp(5rem, 12vh, 9rem) 0 clamp(6rem, 14vh, 10rem);
  }

  .hero-copy {
    max-width: 900px;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  h1 {
    color: var(--text);
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(2.8rem, 6.3vw, 5.2rem);
    font-weight: 400;
    line-height: 0.88;
    letter-spacing: 0;
  }

  .lede {
    max-width: 760px;
    margin-top: 2rem;
    padding-left: 1.35rem;
    border-left: 2px solid var(--accent);
    color: var(--muted);
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(1.35rem, 2.35vw, 2.2rem);
    font-style: italic;
    line-height: 1.04;
  }

  .intro {
    max-width: 840px;
    margin-top: 4.5rem;
    color: var(--soft);
    font-size: clamp(1rem, 1.35vw, 1.3rem);
    line-height: 1.42;
  }

  .inline-accent-teal {
    color: #73c7c7;
    text-decoration-line: underline;
    text-decoration-color: rgba(115, 199, 199, 0.7);
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.16em;
  }

  a {
    color: var(--accent);
    text-decoration-color: rgba(233, 159, 199, 0.55);
    text-underline-offset: 0.16em;
  }

  a:not(.row):hover {
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: currentColor;
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.18em;
  }

  .quick-links {
    margin-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: clamp(1.25rem, 4vw, 2.75rem);
    width: fit-content;
    color: var(--muted);
    font-size: 0.78rem;
  }

  .quick-links a {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    gap: 0.35rem;
    min-width: 58px;
    color: var(--muted);
    text-decoration: none;
  }

  .quick-links img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    image-rendering: pixelated;
    filter: drop-shadow(0 4px 7px rgba(0, 0, 0, 0.28));
    transition: transform 160ms ease;
  }

  .quick-links a:hover img {
    transform: translateY(-3px);
  }

  .quick-links a:hover {
    color: var(--accent);
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: currentColor;
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.18em;
  }

  .floating-links {
    position: fixed;
    top: 50%;
    left: 1rem;
    z-index: 90;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.3rem;
    padding: 0.55rem 0.45rem;
    border: 1px solid var(--border-strong);
    border-radius: 18px;
    background: rgba(18, 16, 23, 0.9);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    opacity: 0;
    pointer-events: none;
    transform: translate(-10px, -50%);
    transition:
      opacity 180ms ease,
      transform 180ms ease;
  }

  .floating-links.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translate(0, -50%);
  }

  .floating-links a {
    min-width: 58px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    padding: 0.25rem;
    border-radius: 10px;
    color: var(--muted);
    font-size: 0.68rem;
    line-height: 1;
    text-decoration: none;
  }

  .floating-links img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    image-rendering: pixelated;
    transition: transform 160ms ease;
  }

  .floating-links a:hover {
    color: var(--accent);
    text-decoration: none;
  }

  .floating-links a:hover img {
    transform: translateY(-3px);
  }

  .dock-toggle {
    display: none;
  }

  .section-block {
    padding: clamp(4.5rem, 10vw, 8rem) 0;
    scroll-margin-top: 100px;
  }

  .section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 2.75rem;
  }

  h2 {
    color: var(--text);
    font-size: clamp(2.35rem, 4.3vw, 3.9rem);
    font-weight: 700;
    line-height: 0.98;
  }

  .section-heading > a {
    font-size: 0.95rem;
  }

  .rows {
    border-top: 1px solid var(--border);
  }

  .row {
    display: grid;
    grid-template-columns: minmax(150px, 0.28fr) minmax(0, 1fr) auto;
    gap: clamp(1.5rem, 4vw, 3rem);
    align-items: start;
    padding: 2.05rem 0;
    border-bottom: 1px solid var(--border);
    color: inherit;
    text-decoration: none;
  }

  .row-meta {
    color: var(--muted);
    font-size: 0.84rem;
    line-height: 1.3;
  }

  .row-meta span {
    display: block;
  }

  .row-main h3 {
    color: var(--text);
    font-size: clamp(1.12rem, 1.7vw, 1.55rem);
    font-weight: 700;
    line-height: 1.05;
  }

  .row-main p,
  .achievements {
    margin-top: 0.7rem;
    color: var(--soft);
    font-size: clamp(0.92rem, 1.08vw, 1.05rem);
    line-height: 1.35;
  }

  .achievements {
    padding-left: 1.2rem;
  }

  .experience-toggle {
    display: grid;
    place-items: center;
    min-width: 32px;
    min-height: 32px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .experience-toggle:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }

  .achievements li + li {
    margin-top: 0.65rem;
  }

  .row-arrow {
    color: var(--muted);
    font-size: 1.3rem;
    line-height: 1;
    transition:
      color 160ms ease,
      transform 160ms ease;
  }

  a.row:hover .row-arrow,
  .row:hover .row-arrow {
    color: var(--accent);
    transform: translateX(0.25rem);
  }

  .experience-toggle[aria-expanded="true"] .row-arrow,
  .row:hover .experience-toggle[aria-expanded="true"] .row-arrow {
    transform: rotate(90deg);
    color: var(--accent);
  }

  .tags,
  .highlight-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .tags {
    margin-top: 1.15rem;
  }

  .tags span,
  .highlight-strip span {
    border: 1px solid var(--border-strong);
    border-radius: 999px;
    padding: 0.1rem 0.55rem 0.18rem;
    color: var(--muted);
    font-size: 0.74rem;
    line-height: 1.2;
  }

  .compact .row-main p {
    margin-top: 0.45rem;
  }

  .contact-block p {
    max-width: 870px;
    color: var(--soft);
    font-size: clamp(1rem, 1.45vw, 1.3rem);
    line-height: 1.42;
  }

  .contact-block p span {
    color: var(--text);
  }

  .highlight-strip {
    margin-top: 2rem;
  }

  @media (max-width: 760px) {
    .hero {
      min-height: auto;
      padding-top: 4.5rem;
    }

    h1 {
      font-size: clamp(2.35rem, 10.5vw, 3.5rem);
    }

    .lede {
      margin-top: 1.6rem;
    }

    .intro {
      margin-top: 3rem;
    }

    .quick-links {
      width: 100%;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .quick-links a {
      min-width: 0;
    }

    .quick-links img {
      width: 40px;
      height: 40px;
    }

    .floating-links {
      top: auto;
      bottom: 4.75rem;
      left: 1rem;
      width: auto;
      margin: 0;
      padding: 0.45rem 0.35rem;
      border-radius: 14px;
      opacity: 0;
      pointer-events: none;
      transform: translateY(8px) scale(0.96);
    }

    .floating-links.visible {
      opacity: 0;
      pointer-events: none;
      transform: translateY(8px) scale(0.96);
    }

    .floating-links.visible.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }

    .floating-links a {
      min-width: 48px;
      padding: 0.2rem;
      font-size: 0.52rem;
    }

    .floating-links img {
      width: 24px;
      height: 24px;
    }

    .section-block {
      scroll-margin-top: 84px;
    }

    .dock-toggle {
      position: fixed;
      left: 1rem;
      bottom: 1rem;
      z-index: 91;
      width: 48px;
      height: 48px;
      display: grid;
      place-items: center;
      padding: 0;
      border: 1px solid var(--border-strong);
      border-radius: 50%;
      background: rgba(18, 16, 23, 0.92);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      -webkit-backdrop-filter: blur(14px);
      backdrop-filter: blur(14px);
      opacity: 0;
      pointer-events: none;
      transform: translateY(8px);
      transition:
        opacity 180ms ease,
        transform 180ms ease,
        border-color 160ms ease;
    }

    .dock-toggle.visible {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .dock-toggle:hover {
      border-color: var(--accent);
    }

    .dock-toggle:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 3px;
    }

    .dock-toggle img {
      width: 34px;
      height: 34px;
      object-fit: contain;
      image-rendering: pixelated;
    }

    .section-heading {
      display: block;
    }

    .section-heading > a {
      display: inline-block;
      margin-top: 1rem;
    }

    .row {
      grid-template-columns: 1fr auto;
      gap: 1rem;
    }

    .row-meta {
      grid-column: 1 / -1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .quick-links img,
    .floating-links img,
    .floating-links {
      transition: none;
    }

    .dock-toggle {
      transition: none;
    }

    .quick-links a:hover img,
    .floating-links a:hover img {
      transform: none;
    }
  }
</style>
