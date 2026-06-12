<script lang="ts">
  import RaftJointDiagram from "$lib/components/blog/RaftJointDiagram.svelte";
  import SiteHeader from "$lib/components/layout/SiteHeader.svelte";
  import { socialLinks } from "$lib/data/nav";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  const { post } = data;

  const raftDiagramsByHeading = {
    "The real problem begins when machines fail": "failure",
    "Leader election": "leader-election",
    "Log replication": "log-replication",
    "Why majority matters": "majority",
    "Split brain": "split-brain",
  } as const;
</script>

<svelte:head>
  <title>{post.title} - Rahul Bhardwaj</title>
  <meta name="description" content={post.description} />
</svelte:head>

<div class="page-shell">
  <SiteHeader links={socialLinks} sticky />

  <main class="content-shell">
    <article class="post">
      <a class="back-link" href="/blog">Back to writing</a>

      <div class="post-meta">
        <span>{post.date}</span>
        <span>/</span>
        <span>{post.readTime}</span>
      </div>

      <h1>{post.title}</h1>
      <p class="post-description">{post.description}</p>

      <div class="tags">
        {#each post.tags as tag}
          <span>{tag}</span>
        {/each}
      </div>

      {#each post.sections as section}
        <section class="content-section">
          <h2>{section.heading}</h2>

          {#if section.paragraphs}
            {#each section.paragraphs as paragraph}
              <p>{paragraph}</p>
            {/each}
          {/if}

          {#if section.bullets}
            <ul>
              {#each section.bullets as bullet}
                <li>{bullet}</li>
              {/each}
            </ul>
          {/if}

          {#if section.codeBlocks}
            {#each section.codeBlocks as block}
              <pre><code>{block.code}</code></pre>
            {/each}
          {/if}

          {#if post.slug === "why-distributed-systems-need-consensus" && section.heading in raftDiagramsByHeading}
            <RaftJointDiagram variant={raftDiagramsByHeading[section.heading as keyof typeof raftDiagramsByHeading]} />
          {/if}
        </section>
      {/each}
    </article>
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

  .post {
    max-width: 860px;
    padding: clamp(4rem, 9vw, 7rem) 0;
  }

  .back-link {
    color: var(--accent);
    font-size: 0.95rem;
    text-decoration-color: rgba(233, 159, 199, 0.55);
    text-underline-offset: 0.16em;
  }

  .back-link:hover {
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: currentColor;
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.18em;
  }

  .post-meta {
    display: flex;
    gap: 0.65rem;
    margin-top: 2rem;
    color: var(--muted);
    font-size: 0.9rem;
  }

  h1,
  h2,
  p,
  ul {
    margin: 0;
  }

  h1 {
    margin-top: 1.4rem;
    color: var(--text);
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(3rem, 7vw, 5.6rem);
    font-weight: 400;
    line-height: 0.95;
  }

  .post-description {
    margin-top: 1.5rem;
    color: var(--soft);
    font-size: clamp(1.05rem, 1.4vw, 1.25rem);
    line-height: 1.45;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-top: 1.3rem;
  }

  .tags span {
    border: 1px solid var(--border-strong);
    border-radius: 999px;
    padding: 0.1rem 0.55rem 0.18rem;
    color: var(--muted);
    font-size: 0.74rem;
    line-height: 1.2;
  }

  .content-section {
    margin-top: 3rem;
  }

  h2 {
    margin-bottom: 1.1rem;
    color: var(--text);
    font-size: clamp(1.5rem, 2.4vw, 2.15rem);
    font-weight: 700;
    line-height: 1.08;
  }

  p {
    margin-top: 0.95rem;
    color: var(--soft);
    font-size: clamp(0.96rem, 1.08vw, 1.05rem);
    line-height: 1.75;
  }

  ul {
    margin-top: 1rem;
    padding-left: 1.15rem;
    color: var(--soft);
  }

  li {
    margin-top: 0.5rem;
    font-size: clamp(0.96rem, 1.08vw, 1.05rem);
    line-height: 1.65;
  }

  pre {
    margin-top: 1.15rem;
    padding: 1rem 1.1rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow-x: auto;
    background: rgba(20, 18, 26, 0.9);
  }

  code {
    color: #d7d4de;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.88rem;
    line-height: 1.6;
  }

  @media (max-width: 760px) {
    .post {
      padding: 3rem 0 4rem;
    }

    h1 {
      font-size: clamp(2.4rem, 12vw, 4rem);
    }
  }
</style>
