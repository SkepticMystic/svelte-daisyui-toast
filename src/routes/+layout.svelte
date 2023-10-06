<script>
	import Toaster from '$lib/components/Toaster.svelte';
	import '../app.css';
</script>

<slot />

<Toaster alignment={{ x: 'end', y: 'top' }} />
