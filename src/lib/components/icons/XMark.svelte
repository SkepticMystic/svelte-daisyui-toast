<script lang="ts">
  export let w: `w-${number}` = "w-5";
  export let h: `h-${number}` = "h-5";
  export let colour: string = "";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="{w} {h} {colour}"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M6 18L18 6M6 6l12 12"
  />
</svg>
