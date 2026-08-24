<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import BootScreen from "$lib/components/fun/BootScreen.svelte";
  import ClickSound from "$lib/components/fun/ClickSound.svelte";
  import MusicPlayer from "$lib/components/fun/MusicPlayer.svelte";
  import PixelPal from "$lib/components/fun/PixelPal.svelte";

  let { children } = $props();
  let booted = $state(false);
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/IMG_3603.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{@render children()}

<BootScreen onReady={() => (booted = true)} />
<ClickSound />

{#if booted}
  <MusicPlayer />
  <PixelPal />
{/if}
