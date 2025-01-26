<script lang="ts">
  import Toaster from "$lib/components/Toaster.svelte";
  import "../app.css";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

{@render children?.()}

<Toaster alignment={{ x: "end", y: "top" }} />
