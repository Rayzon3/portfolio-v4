<script>
  import { tocItems } from "$lib/data/home";

  export let rahulOnline = false;
  export let activeSiteWide = 0;
  export let activeThisPage = 0;
  export let activeSectionId = "hello";
</script>

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
    {#each tocItems as item}
      <a
        class="toc-link"
        class:active={activeSectionId === item.id}
        href={`#${item.id}`}
        data-toc={item.id}
      >
        {item.label}
      </a>
    {/each}
  </div>
</aside>

<style>
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

  .toc-link.active {
    color: #ebbcba;
    text-decoration: underline;
  }

  .toc-link.active::before {
    color: #ebbcba;
  }

  @media (max-width: 980px) {
    .sidebar {
      position: relative;
      top: 0;
    }
  }
</style>
