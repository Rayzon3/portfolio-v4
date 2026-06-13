<script>
  import { blogPosts } from "$lib/data/blog";
  import { experiences, profile, stackList } from "$lib/data/home";

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

    <div class="quick-links" aria-label="Portfolio sections">
      <a href="#experience">Experience</a>
      <a href="#projects">Projects</a>
      <a href="#writing">Writing</a>
      <a href="#contact">Contact</a>
    </div>
  </div>
</section>

<section id="experience" class="section-block">
  <div class="section-heading">
    <h2>Experience</h2>
  </div>

  <div class="rows">
    {#each experiences as experience}
      <article class="row">
        <div class="row-meta">
          <span>{experience.period}</span>
          <span>{experience.company}</span>
        </div>

        <div class="row-main">
          <h3>{experience.role}</h3>
          <p>{experience.achievements[0]}</p>

          <div class="tags" aria-label={`${experience.company} technologies`}>
            {#each experience.tech.slice(0, 6) as tech}
              <span>{tech}</span>
            {/each}
          </div>
        </div>

        <span class="row-arrow" aria-hidden="true">→</span>
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
    font-size: clamp(3.4rem, 8.5vw, 7rem);
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
    gap: 1.6rem;
    color: var(--muted);
    font-size: 0.95rem;
  }

  .quick-links a {
    color: var(--muted);
    text-decoration: none;
  }

  .quick-links a:hover {
    color: var(--accent);
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: currentColor;
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.18em;
  }

  .section-block {
    padding: clamp(4.5rem, 10vw, 8rem) 0;
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

  .row-main p {
    margin-top: 0.7rem;
    color: var(--soft);
    font-size: clamp(0.92rem, 1.08vw, 1.05rem);
    line-height: 1.35;
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
      font-size: clamp(2.8rem, 14vw, 4.5rem);
    }

    .lede {
      margin-top: 1.6rem;
    }

    .intro {
      margin-top: 3rem;
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
</style>
