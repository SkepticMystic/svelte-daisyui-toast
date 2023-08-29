<script lang="ts">
	import { page } from '$app/stores';
	import { toast } from '$lib/stores/toast.js';
	import SingleToast from './SingleToast.svelte';

	/** Align the toast along the x and y axes */
	export let alignment: {
		x?: 'start' | 'center' | 'end';
		y?: 'top' | 'middle' | 'bottom';
	} = {};

	const resolvedAlignment = {
		x: alignment.x ?? 'end',
		y: alignment.y ?? 'bottom'
	};

	const toastAlignments = {
		start: 'toast-start',
		center: 'toast-center',
		end: 'toast-end',
		top: 'toast-top',
		middle: 'toast-middle',
		bottom: 'toast-bottom'
	};
</script>

<div class="toast {toastAlignments[resolvedAlignment.x]} {toastAlignments[resolvedAlignment.y]}">
	{#each $toast as t (t.id)}
		<!-- showOnRoutes -->
		{#if !t.showOnRoutes?.length || t.showOnRoutes.some((r) => $page.url.pathname.startsWith(r))}
			<SingleToast {t} />
		{/if}
	{/each}
</div>
