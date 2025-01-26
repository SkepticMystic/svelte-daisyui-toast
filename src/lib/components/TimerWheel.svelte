<script lang="ts">
  import { Tween } from "svelte/motion";

  interface Props {
    /** The duration of the timer wheel in milliseconds */
    duration_ms: number;
    /** The size of the timer wheel, passed to the inline style parameter "--size" */
    size?: string;
    /** The thickness of the timer wheel, passed to the inline style parameter "--thickness" */
    thickness?: string;
    onclick: () => void;
    children?: import("svelte").Snippet;
  }

  let {
    duration_ms,
    size = "34px",
    thickness = "3px",
    onclick,
    children,
  }: Props = $props();

  const tween = new Tween(0, { duration: duration_ms });
  tween.target += duration_ms;

  let perc = $derived((tween.current / duration_ms) * 100);
</script>

<button
  {onclick}
  style="--size:{size}; --thickness:{thickness}; --value:{perc};"
  class="btn btn-circle btn-ghost radial-progress btn-sm cursor-pointer"
>
  {@render children?.()}
</button>
