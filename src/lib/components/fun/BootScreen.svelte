<script lang="ts">
  import { onMount, tick } from "svelte";
  import { clickSoundSrc, tracks } from "$lib/data/audio";

  let { onReady }: { onReady: () => void } = $props();

  let visible = $state(true);
  let fading = $state(false);
  let progress = $state(0);
  let logElement = $state<HTMLDivElement>();
  let logs = $state<string[]>([
    "[    0.000000 ] sys 4.0.0 starting...",
    "[    0.000314 ] mounting portfolio filesystem",
    "[    0.001337 ] initializing media subsystem",
  ]);

  const assets = [
    { src: "/idle.png", label: "idle sprite" },
    { src: "/running.png", label: "running sprite" },
    { src: "/jumping.png", label: "jumping sprite" },
    { src: "/IMG_3603.png", label: "profile image" },
    { src: "/MapleMono-NF-Base-Mono.ttf", label: "terminal font" },
    { src: "/sword_01.png", label: "experience icon" },
    { src: "/wooden_box.png", label: "projects icon" },
    { src: "/book.png", label: "writing icon" },
    { src: "/feather_a.png", label: "contact icon" },
    { src: "/compass.png", label: "mobile navigation icon" },
    { src: clickSoundSrc, label: "interface sounds" },
    ...tracks.map((track) => ({
      src: track.src,
      label: `audio: ${track.artist} / ${track.title}`,
    })),
  ];

  $effect(() => {
    logs.length;
    void tick().then(() => {
      if (logElement) logElement.scrollTop = logElement.scrollHeight;
    });
  });

  onMount(() => {
    const startedAt = performance.now();
    const controller = new AbortController();
    const timers: number[] = [];
    let complete = 0;
    let disposed = false;

    document.body.classList.add("booting");

    const addLog = (message: string) => {
      if (!disposed) logs = [...logs, message];
    };

    const loadAsset = async (asset: (typeof assets)[number]) => {
      try {
        const response = await fetch(asset.src, {
          cache: "force-cache",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(String(response.status));
        await response.blob();
        addLog(`[  OK  ] loaded ${asset.label}`);
      } catch (error) {
        if (!controller.signal.aborted) {
          addLog(`[ WARN ] could not preload ${asset.label}`);
        }
      } finally {
        complete += 1;
        progress = Math.round((complete / assets.length) * 100);
      }
    };

    const delay = (duration: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, duration));
      });

    const boot = async () => {
      const preload = Promise.allSettled(assets.map(loadAsset));
      const outcome = await Promise.race([
        preload.then(() => "complete" as const),
        delay(12000).then(() => "timeout" as const),
      ]);

      if (outcome === "timeout") {
        controller.abort();
        addLog("[ WARN ] preload timeout; continuing with available assets");
      }

      const elapsed = performance.now() - startedAt;
      if (elapsed < 2000) await delay(2000 - elapsed);
      if (disposed) return;

      progress = 100;
      addLog("[  OK  ] all systems ready");
      addLog("[    2.026824 ] welcome, visitor");
      await delay(320);
      if (disposed) return;

      onReady();
      fading = true;
      await delay(450);
      if (disposed) return;

      visible = false;
      document.body.classList.remove("booting");
    };

    void boot();

    return () => {
      disposed = true;
      controller.abort();
      timers.forEach(window.clearTimeout);
      document.body.classList.remove("booting");
    };
  });
</script>

{#if visible}
  <div class="boot-screen" class:fading role="status" aria-live="polite">
    <div class="terminal">
      <div class="wordmark">sys<span>/init</span></div>

      <div class="log" bind:this={logElement} aria-label="Loading website">
        {#each logs as line}
          <div>{line}</div>
        {/each}
        <span class="cursor" aria-hidden="true"></span>
      </div>

      <div class="progress-row">
        <span>BOOT</span>
        <div class="progress-track" aria-hidden="true">
          <div class="progress-fill" style:width={`${progress}%`}></div>
        </div>
        <span>{progress.toString().padStart(3, "0")}%</span>
      </div>
    </div>
  </div>
{/if}

<style>
  @font-face {
    font-family: "Maple Mono Boot";
    src: url("/MapleMono-NF-Base-Mono.ttf") format("truetype");
    font-display: swap;
  }

  :global(body.booting) {
    overflow: hidden;
  }

  .boot-screen {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    padding: clamp(1.25rem, 5vw, 4rem);
    overflow: hidden;
    background: radial-gradient(
        circle at 50% 45%,
        rgba(85, 214, 194, 0.07),
        transparent 42%
      ),
      #07060a;
    color: #b7b1bb;
    opacity: 1;
    transition:
      opacity 420ms ease,
      visibility 420ms ease;
  }

  .boot-screen::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 3px,
      rgba(255, 255, 255, 0.018) 4px
    );
  }

  .boot-screen.fading {
    visibility: hidden;
    opacity: 0;
  }

  .terminal {
    width: min(100%, 760px);
    font-family: "Maple Mono Boot", ui-monospace, SFMono-Regular, Menlo,
      monospace;
  }

  .wordmark {
    margin-bottom: clamp(2.5rem, 8vh, 5.5rem);
    color: #f4f1f4;
    font-size: clamp(1.4rem, 4vw, 2.25rem);
    font-weight: 700;
    letter-spacing: -0.06em;
  }

  .wordmark span {
    color: #55d6c2;
  }

  .log {
    height: min(40vh, 290px);
    overflow: hidden;
    font-size: clamp(0.68rem, 1.7vw, 0.86rem);
    line-height: 1.7;
  }

  .log div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cursor {
    display: inline-block;
    width: 0.6em;
    height: 1em;
    margin-top: 0.25rem;
    background: #55d6c2;
    vertical-align: text-bottom;
    animation: blink 700ms steps(1) infinite;
  }

  .progress-row {
    display: grid;
    grid-template-columns: auto 1fr 4ch;
    gap: 0.8rem;
    align-items: center;
    margin-top: 1.5rem;
    color: #918895;
    font-size: 0.7rem;
  }

  .progress-track {
    height: 3px;
    overflow: hidden;
    background: rgba(145, 136, 149, 0.2);
  }

  .progress-fill {
    height: 100%;
    background: #55d6c2;
    transition: width 180ms ease;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .boot-screen,
    .progress-fill {
      transition: none;
    }

    .cursor {
      animation: none;
    }
  }
</style>
