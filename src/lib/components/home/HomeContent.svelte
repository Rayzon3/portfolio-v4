<script>
  import { experiences, profile, stackList } from "$lib/data/home";
</script>

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

    <section>
      <p>
        Ahoy!! I'm <code class="inline-code">{profile.name}</code>!
      </p>

      <p>
        I'm currently a <code class="inline-code">{profile.title}</code> based in
        <span class="highlight">{profile.location}</span>
        trying to create great software experiences!
      </p>

      <p>I usually work with Typescript, NodeJs and React.</p>

      <p>In my spare time I enjoy playing guitar, gaming and watching anime.</p>
    </section>

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
      frameworks, primarily focused on web development or systems programming.
    </p>

    <p>Nowadays, my go-to tech stack includes:</p>

    <ul>
      {#each stackList as item}
        <li>{item}</li>
      {/each}
    </ul>

    <p>
      I've been a longtime member of the ricing community, which still
      regularly inspires me to optimize my workflow and environment.
    </p>

    <h2 id="experience">Experience</h2>

    {#each experiences as experience}
      <div class="experience-item">
        <div class="experience-header">
          <div class="experience-period">
            <span>{experience.period}</span>
          </div>
        </div>

        <h3 class="job-title">{experience.role}</h3>
        <div class="company-info">
          <span class="company-name">{experience.company}</span>
        </div>

        <ul class="achievements">
          {#each experience.achievements as achievement}
            <li>{achievement}</li>
          {/each}
        </ul>

        <div class="tech-tags">
          {#each experience.tech as tech}
            <code class="inline-code-tech_tag">{tech}</code>
          {/each}
        </div>
      </div>
    {/each}

    <h2 id="blog-projects">Blog &amp; Projects</h2>

    <p>
      You can check out my writings on various topics on my <a href="/blog"
        >blog</a
      >.
    </p>

    <p>
      You can additionally see a list of <a href="https://github.com/Rayzon3"
        >projects</a
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
      Feel free to reach out to me via
      <a href="mailto:{profile.email}">email</a> or any of the platforms above
      if you want to chat!
    </p>

    <div class="sticky-footer">
      <div class="post-footer-links">
        <a href="/rss.xml" class="footer-chip" target="_blank" rel="noopener">
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

<style>
  .content {
    min-width: 0;
  }

  article {
    animation: fadeIn 0.3s ease-in;
    padding-bottom: 4rem;
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

  .post-footer-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-top: 1px solid #26233a;
  }

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

  @media (max-width: 640px) {
    .post-footer-links {
      padding: 0.9rem 0;
    }
  }
</style>
