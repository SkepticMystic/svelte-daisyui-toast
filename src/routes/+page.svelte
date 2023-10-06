<script lang="ts">
	import { toast } from '$lib/stores/toast.js';
	import XMark from '$lib/components/icons/XMark.svelte';

	$toast = [];

	toast.add({ type: 'info', message: 'Info' });
	toast.add({ type: 'success', message: 'Success' });
	toast.add({ type: 'warning', message: 'Warning' });
	toast.add({ type: 'error', message: 'Error' });
	toast.add({ type: 'primary', message: 'Primary' });
	toast.add({ type: 'secondary', message: 'Secondary' });
	toast.add({ type: 'accent', message: 'Accent' });

	toast.add({
		type: 'info',
		message: '<strong>H</strong><em>T</em><a href="/" class="link underline">M</a>L',
		html: true
	});
	toast.add({
		type: 'info',
		message:
			'<p>Looooooong string that should overflow the max width of the SingleToast component</p>',
		html: true
	});

	toast.add({
		type: 'info',
		message: '5 second duration',
		duration_ms: 5000
	});

	toast.add({
		type: 'info',
		message: 'String icon',
		icon: '🏠'
	});

	toast.add({
		type: 'info',
		message: 'Component icon',
		icon: XMark
	});
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
