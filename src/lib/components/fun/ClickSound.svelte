<script lang="ts">
  import { onMount } from "svelte";
  import { clickSoundSrc } from "$lib/data/audio";

  let clickSound: HTMLAudioElement;

  onMount(() => {
    clickSound.volume = 0.4;

    const playClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const control = event.target.closest(
        "a[href], button:not(:disabled), [role='button']",
      );
      if (!control) return;

      clickSound.currentTime = 0;
      void clickSound.play().catch(() => {
        // A failed effect should never interfere with the visitor's click.
      });
    };

    document.addEventListener("click", playClick);

    return () => {
      document.removeEventListener("click", playClick);
    };
  });
</script>

<audio bind:this={clickSound} src={clickSoundSrc} preload="auto"></audio>
