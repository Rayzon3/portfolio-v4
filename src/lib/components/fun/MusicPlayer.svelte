<script lang="ts">
  import { onMount, tick } from "svelte";
  import { tracks } from "$lib/data/audio";

  let audio: HTMLAudioElement;
  let isPlaying = false;
  let manuallyPaused = false;
  let currentTrackIndex = 0;

  $: currentTrack = tracks[currentTrackIndex];

  const start = async () => {
    if (manuallyPaused || !audio?.paused) return;

    try {
      await audio.play();
    } catch {
      // Browsers commonly require a user gesture before playing audio. The
      // listeners installed below will try again on the first interaction.
    }
  };

  const toggle = async () => {
    if (audio.paused) {
      manuallyPaused = false;
      await start();
    } else {
      manuallyPaused = true;
      audio.pause();
    }
  };

  const nextTrack = async () => {
    const shouldKeepPlaying = isPlaying || audio.ended;
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    await tick();
    audio.load();

    if (shouldKeepPlaying) {
      manuallyPaused = false;
      await start();
    }
  };

  onMount(() => {
    audio.volume = 0.5;

    const unlockAudio = (event: Event) => {
      if (
        event.target instanceof Element &&
        event.target.closest("[data-music-player]")
      ) {
        return;
      }
      void start();
    };

    document.addEventListener("pointerdown", unlockAudio, { once: true });
    document.addEventListener("keydown", unlockAudio, { once: true });
    void start();

    return () => {
      document.removeEventListener("pointerdown", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };
  });
</script>

<audio
  bind:this={audio}
  src={currentTrack.src}
  autoplay
  preload="auto"
  onplay={() => (isPlaying = true)}
  onpause={() => (isPlaying = false)}
  onended={nextTrack}
></audio>

<div class="player" data-music-player class:playing={isPlaying}>
  <button
    class="toggle"
    type="button"
    onclick={toggle}
    aria-label={isPlaying ? "Pause background music" : "Play background music"}
    aria-pressed={isPlaying}
    title={`${isPlaying ? "Pause" : "Play"} ${currentTrack.title}`}
  >
    <span class="bars" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
    <span class="track">
      <span class="track-name">{currentTrack.title}</span>
      <span class="track-state">
        {currentTrack.artist} · {isPlaying ? "Sound on" : "Sound off"}
      </span>
    </span>
  </button>

  <button
    class="next"
    type="button"
    onclick={nextTrack}
    aria-label="Play next song"
    title="Next song"
  >
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 3.1v9.8L10 8 2.5 3.1Zm8.2 0h2v9.8h-2V3.1Z" />
    </svg>
  </button>
</div>

<style>
  .player {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 90;
    display: flex;
    align-items: center;
    min-height: 38px;
    border: 1px solid var(--border-strong, rgba(145, 136, 149, 0.34));
    border-radius: 999px;
    background: rgba(18, 16, 23, 0.88);
    color: var(--muted, #918895);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.24);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    font-size: 0.76rem;
    line-height: 1;
    transition:
      border-color 160ms ease,
      color 160ms ease,
      transform 160ms ease;
  }

  .player:hover {
    border-color: var(--accent, #e99fc7);
    color: var(--text, #f4f1f4);
    transform: translateY(-1px);
  }

  button {
    border: 0;
    background: none;
    color: inherit;
    cursor: pointer;
  }

  button:focus-visible {
    outline: 2px solid var(--accent, #e99fc7);
    outline-offset: -2px;
  }

  .toggle {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    min-width: 0;
    padding: 0.5rem 0.7rem 0.5rem 0.75rem;
    border-radius: 999px 0 0 999px;
  }

  .bars {
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }

  .bars span {
    width: 2px;
    height: 3px;
    border-radius: 2px;
    background: currentColor;
  }

  .track {
    display: grid;
    gap: 0.15rem;
    text-align: left;
  }

  .track-name {
    max-width: min(48vw, 190px);
    overflow: hidden;
    color: var(--text, #f4f1f4);
    font-size: 0.76rem;
    font-weight: 600;
    line-height: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .track-state {
    color: currentColor;
    font-size: 0.66rem;
    line-height: 1;
  }

  .next {
    width: 34px;
    align-self: stretch;
    display: grid;
    place-items: center;
    border-left: 1px solid var(--border-strong, rgba(145, 136, 149, 0.34));
    border-radius: 0 999px 999px 0;
  }

  .next:hover {
    color: var(--accent, #e99fc7);
  }

  .next svg {
    width: 13px;
    height: 13px;
    fill: currentColor;
  }

  .player.playing {
    border-color: rgba(233, 159, 199, 0.5);
    color: var(--accent, #e99fc7);
  }

  .player.playing .bars span {
    animation: pulse 0.8s ease-in-out infinite alternate;
  }

  .player.playing .bars span:nth-child(2) {
    animation-delay: -0.5s;
  }

  .player.playing .bars span:nth-child(3) {
    animation-delay: -0.25s;
  }

  @keyframes pulse {
    from {
      height: 3px;
    }
    to {
      height: 13px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .player,
    .player.playing .bars span {
      animation: none;
      transition: none;
    }
  }
</style>
