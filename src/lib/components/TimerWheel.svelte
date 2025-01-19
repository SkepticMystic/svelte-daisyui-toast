<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { tweened } from "svelte/motion";

  /** The duration of the timer wheel in milliseconds */
  export let duration_ms: number;
  /** The size of the timer wheel, passed to the inline style parameter "--size" */
  export let size: string = "34px";
  /** The thickness of the timer wheel, passed to the inline style parameter "--thickness" */
  export let thickness: string = "3px";

  const dispatch = createEventDispatcher();

  const tween = tweened(0, { duration: duration_ms });
  $tween += duration_ms;

  $: perc = ($tween / duration_ms) * 100;
</script>

<button
  class="btn btn-circle btn-ghost radial-progress btn-sm cursor-pointer"
  style="--size:{size}; --thickness:{thickness}; --value:{perc};"
  on:click={() => dispatch("click")}
>
  <slot />
</button>
