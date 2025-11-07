<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { X } from "@lucide/svelte";

  const modalSrc = writable("");
  const modalCaption = writable("");
  const showModal = writable(false);

  const attachListeners = () => {
    document.querySelectorAll<HTMLElement>(".zoomable-image").forEach((figure) => {
      if (figure.dataset.listenerAttached) return;

      figure.dataset.listenerAttached = "true";

      figure.addEventListener("click", () => {
        const img = figure.querySelector<HTMLImageElement>("img");
        if (img) {
          modalSrc.set(img.src);
          modalCaption.set(img.alt || "");
          showModal.set(true);
        }
      });
    });
  }

  onMount(() => {
    attachListeners();

    const observer = new MutationObserver(() => attachListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  });

  const closeModal = () => {
    showModal.set(false);
  }
</script>

<slot />

{#if $showModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-zoom-out" on:click={closeModal}>
    <div class="relative max-w-6xl max-h-[90vh] p-4 flex flex-col items-center justify-center" on:click|stopPropagation>
      <img src={$modalSrc} alt={$modalCaption} class="max-w-full max-h-[80vh] object-contain rounded"/>
      {#if $modalCaption}
        <p class="mt-4 text-white text-center">{$modalCaption}</p>
      {/if}
      <button class="absolute -top-2 -right-2 p-2 bg-foreground text-background rounded-full cursor-pointer" on:click={closeModal}>
        <X />
      </button>
    </div>
  </div>
{/if}
