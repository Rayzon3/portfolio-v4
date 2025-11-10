<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/IMG_3603.png" />
</svelte:head>

{@render children()}
