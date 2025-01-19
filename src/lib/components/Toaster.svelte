<script lang="ts">
  import { beforeNavigate } from "$app/navigation";
  import { toast } from "$lib/stores/toast.js";
  import SingleToast from "./SingleToast.svelte";

  /** Align the toast along the x and y axes */
  export let alignment: {
    x?: "start" | "center" | "end";
    y?: "top" | "middle" | "bottom";
  } = {};

  const resolvedAlignment = {
    x: alignment.x ?? "end",
    y: alignment.y ?? "bottom",
  };

  const toastAlignments = {
    start: "toast-start",
    center: "toast-center",
    end: "toast-end",
    top: "toast-top",
    middle: "toast-middle",
    bottom: "toast-bottom",
  };

  beforeNavigate(() => {
    $toast = $toast.filter((t) => !t.clear_on_navigate);
  });
</script>

<div
  class="toast {toastAlignments[resolvedAlignment.x]} {toastAlignments[
    resolvedAlignment.y
  ]}"
>
  {#each $toast as t (t.id)}
    <SingleToast {t} />
  {/each}
</div>
