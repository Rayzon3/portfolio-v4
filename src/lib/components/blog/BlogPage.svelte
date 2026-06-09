<script>
  import SiteHeader from "$lib/components/layout/SiteHeader.svelte";
  import { socialLinks } from "$lib/data/nav";

  const posts = [
    {
      date: "Jun 2026",
      readTime: "4 min read",
      title: "Notes on building fast web interfaces",
      summary: "Practical patterns from React, Svelte, and server-backed UI work.",
      tags: ["Frontend", "Performance"],
    },
    {
      date: "Jun 2026",
      readTime: "5 min read",
      title: "Systems I want to understand better",
      summary: "A running list across backend architecture, compilers, and tooling.",
      tags: ["Systems", "Learning"],
    },
  ];
</script>

<svelte:head>
  <title>Writing - Rahul Bhardwaj</title>
</svelte:head>

<div class="page-shell">
  <SiteHeader links={socialLinks} sticky />

  <main class="content-shell">
    <section class="writing">
      <div class="section-heading">
        <h1>Writing</h1>
        <a href="/">Home</a>
      </div>

      <div class="rows">
        {#each posts as post}
          <article class="row">
            <div class="row-meta">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>

            <div class="row-main">
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <div class="tags">
                {#each post.tags as tag}
                  <span>{tag}</span>
                {/each}
              </div>
            </div>

            <span class="row-arrow" aria-hidden="true">→</span>
          </article>
        {/each}
      </div>
    </section>
  </main>
</div>

<style>
  :global(:root) {
    --bg: #0f0e13;
    --text: #f4f1f4;
    --soft: #b7b1bb;
    --muted: #918895;
    --accent: #e99fc7;
    --border: rgba(145, 136, 149, 0.2);
    --border-strong: rgba(145, 136, 149, 0.34);
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    background: #07060a;
    color: var(--text);
    font-family: "Instrument Sans", system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.5;
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

  .writing {
    min-height: calc(100vh - 83px);
    padding: clamp(4.5rem, 10vw, 8rem) 0;
  }

  .section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  h1 {
    color: var(--text);
    font-size: clamp(2.8rem, 5.9vw, 4.6rem);
    font-weight: 700;
    line-height: 0.95;
  }

  a {
    color: var(--accent);
    font-size: 0.9rem;
    text-decoration-color: rgba(233, 159, 199, 0.55);
    text-underline-offset: 0.16em;
  }

  a:hover {
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: currentColor;
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.18em;
  }

  .rows {
    border-top: 1px solid var(--border);
  }

  .row {
    display: grid;
    grid-template-columns: minmax(150px, 0.25fr) minmax(0, 1fr) auto;
    gap: clamp(1.5rem, 4vw, 3rem);
    align-items: start;
    padding: 2.1rem 0;
    border-bottom: 1px solid var(--border);
  }

  .row-meta {
    color: var(--muted);
    font-size: 0.84rem;
    line-height: 1.3;
  }

  .row-meta span {
    display: block;
  }

  .row-main h2 {
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
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-top: 1.15rem;
  }

  .tags span {
    border: 1px solid var(--border-strong);
    border-radius: 999px;
    padding: 0.1rem 0.55rem 0.18rem;
    color: var(--muted);
    font-size: 0.74rem;
    line-height: 1.2;
  }

  @media (max-width: 760px) {
    .section-heading {
      display: block;
    }

    .section-heading a {
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
