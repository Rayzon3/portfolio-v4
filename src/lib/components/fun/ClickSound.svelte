<script lang="ts">
  import { onMount } from "svelte";
  import { clickSoundSrc } from "$lib/data/audio";

  let fallbackSound: HTMLAudioElement;

  onMount(() => {
    fallbackSound.volume = 0.4;

    const audioContext = new AudioContext();
    let clickBuffer: AudioBuffer | null = null;

    void fetch(clickSoundSrc, { cache: "force-cache" })
      .then((response) => response.arrayBuffer())
      .then((data) => audioContext.decodeAudioData(data))
      .then((buffer) => {
        clickBuffer = buffer;
      })
      .catch(() => {
        // The HTML audio element below remains available as a fallback.
      });

    const playFallback = () => {
      fallbackSound.currentTime = 0;
      void fallbackSound.play().catch(() => {});
    };

    const playClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const control = event.target.closest(
        "a[href], button:not(:disabled), [role='button']",
      );
      if (!control) return;

      if (!clickBuffer || audioContext.state === "closed") {
        playFallback();
        return;
      }

      if (audioContext.state === "suspended") {
        void audioContext.resume();
      }

      const source = audioContext.createBufferSource();
      const gain = audioContext.createGain();
      source.buffer = clickBuffer;
      gain.gain.value = 0.4;
      source.connect(gain).connect(audioContext.destination);
      source.start();
    };

    document.addEventListener("click", playClick);

    return () => {
      document.removeEventListener("click", playClick);
      void audioContext.close();
    };
  });
</script>

<audio bind:this={fallbackSound} src={clickSoundSrc} preload="auto"></audio>
