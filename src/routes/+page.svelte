<script lang="ts">
  import { toast } from "$lib/stores/toast.js";
  import XMark from "$lib/components/icons/XMark.svelte";

  $toast = [];

  toast.add({ type: "info", duration_ms: 5_000, message: "Info" });
  toast.add({ type: "success", duration_ms: 5_000, message: "Success" });
  toast.add({ type: "warning", duration_ms: 5_000, message: "Warning" });
  toast.add({ type: "error", duration_ms: 5_000, message: "Error" });
  toast.add({ type: "primary", duration_ms: 5_000, message: "Primary" });
  toast.add({ type: "secondary", duration_ms: 5_000, message: "Secondary" });
  toast.add({ type: "accent", duration_ms: 5_000, message: "Accent" });

  toast.add({
    type: "info",
    message:
      '<strong>H</strong><em>T</em><a href="/" class="link underline">M</a>L',
    html: true,
  });
  toast.add({
    type: "info",
    message:
      "<p>Looooooong string that should overflow the max width of the SingleToast component</p>",
    html: true,
  });

  toast.add({
    type: "info",
    message: "5 second duration",
    duration_ms: 5000,
  });

  toast.add({
    type: "info",
    message: "String icon",
    icon: "🏠",
  });

  toast.add({
    type: "info",
    message: "Component icon",
    icon: XMark,
  });

  toast.add({
    type: "warning",
    message: "Clear on navigate",
    clear_on_navigate: true,
  });
</script>

<h1>Welcome to your library project</h1>

<p>
  Create your package using @sveltejs/package and preview/showcase your work
  with SvelteKit
</p>

<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
