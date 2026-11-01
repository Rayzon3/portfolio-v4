<script lang="ts">
  import { onMount } from "svelte";
  import { clickSoundSrc, tracks } from "$lib/data/audio";

  let { onReady }: { onReady: () => void } = $props();

  let visible = $state(true);
  let fading = $state(false);
  let progress = $state(0);
  let status = $state("Initializing portfolio filesystem...");

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

  onMount(() => {
    const startedAt = performance.now();
    const controller = new AbortController();
    const timers: number[] = [];
    let complete = 0;
    let disposed = false;

    document.body.classList.add("booting");

    const addLog = (message: string) => {
      if (!disposed) status = message;
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
  <div class="boot-screen" class:fading>
    <div class="terminal" aria-label="Portfolio boot loader">
      <div class="version">GNU GRUB <span>version 2.04</span></div>

      <div class="boot-menu" aria-label="Boot entry">
        <div class="selected-entry">*Rahul Bhardwaj — Portfolio</div>
        <div class="entry-detail">sys/init (v4.0.0)</div>
      </div>

      <div class="boot-help">
        <p>The highlighted entry will boot automatically.</p>
        <p>Loading portfolio assets... {progress.toString().padStart(3, "0")}%</p>
        <p class="status" role="status" aria-live="polite">{status}</p>
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
    padding: clamp(12px, 2vw, 28px);
    overflow: auto;
    background: #000;
    color: #aaa;
    opacity: 1;
    transition: opacity 420ms ease, visibility 420ms ease;
    font-family: "Maple Mono Boot", "Courier New", monospace;
    font-size: clamp(12px, 1.5vw, 16px);
    font-weight: 400;
    line-height: 1.25;
  }

  .boot-screen.fading {
    visibility: hidden;
    opacity: 0;
  }

  .terminal {
    width: 100%;
    max-width: 1200px;
    margin-inline: auto;
  }

  .version {
    margin-bottom: clamp(22px, 5vh, 48px);
    text-align: center;
  }

  .version span {
    margin-left: 1ch;
  }

  .boot-menu {
    min-height: 62vh;
    border: 2px solid #ddd;
    padding: 6px 3px;
    color: #ddd;
  }

  .selected-entry {
    background: #aaa;
    color: #000;
    padding-right: 1ch;
    overflow-wrap: anywhere;
  }

  .entry-detail {
    padding-left: 1ch;
  }

  .boot-help {
    margin: clamp(22px, 5vh, 40px) clamp(8px, 5vw, 64px) 0;
    overflow-wrap: anywhere;
  }

  .boot-help p {
    margin: 0;
  }

  .status {
    margin-top: 1em !important;
  }

  @media (max-width: 480px) {
    .boot-menu {
      min-height: 55vh;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .boot-screen {
      transition: none;
    }
  }
</style>
