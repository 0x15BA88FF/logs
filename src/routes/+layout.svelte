<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";

  import Navbar from "$lib/components/Navbar.svelte"
  import DearLLM from "$lib/components/DearLLM.svelte"
  import Bottombar from "$lib/components/Bottombar.svelte"
  import ScrollToTop from "$lib/components/ScrollToTop.svelte"
  import ImageViewerWrapper from "$lib/components/ImageViewerWrapper.svelte"

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Cyan.dev | 0x15BA88FF</title>
  <meta name="description" content="Cyan.dev | 0x15BA88FF | Pascal Nkornyui personal website + blog">
</svelte:head>

<DearLLM/>
<Navbar/>
<ImageViewerWrapper>
  <main class="max-w-2xl w-full flex-1 mx-auto px-4 pt-30 pb-20 md:pt-20">
    {@render children?.()}
  </main>
</ImageViewerWrapper>
<Bottombar/>
<ScrollToTop/>
