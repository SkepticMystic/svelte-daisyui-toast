<script lang="ts">
	import { page } from '$app/stores';
	import XMark from '$lib/components/icons/XMark.svelte';
	import { toast } from '$lib/stores/toast.js';
	import type { Toast } from '$lib/types/toast.js';
	import { scale } from 'svelte/transition';
	import TimerWheel from './TimerWheel.svelte';

	export let t: Toast;

	const alertTypes: Record<Toast['type'], string> = {
		info: 'alert-info',
		success: 'alert-success',
		warning: 'alert-warning',
		error: 'alert-error'
	};
</script>

<div class="alert {alertTypes[t.type]} flex justify-between grow max-w-md" out:scale={{ duration: 300 }}>
	<div class="flex items-center gap-3">
		<!-- icon -->
		{#if typeof t.icon === 'string'}
			<span>{t.icon}</span>
		{:else}
			<svelte:component this={t.icon} />
		{/if}

		<div class='whitespace-pre-wrap'>
			<!-- html -->
			{#if t.html}
				{@html t.message}
			{:else}
				{t.message}
			{/if}
		</div>
	</div>

	<!-- duration_ms -->
	{#if t.duration_ms}
		<!-- Only set the timeout when the toast is rendered. This allows it to work with showOnRoutes -->
		{@const _timer = setTimeout(() => toast.remove(t.id), t.duration_ms)}

		<TimerWheel
			duration_ms={t.duration_ms}
			on:click={() => {
				toast.remove(t.id);
				clearTimeout(_timer);
			}}
		>
			<XMark w="w-4" h="h-4" />
		</TimerWheel>
	{:else}
		<button class="btn btn-sm btn-circle btn-ghost" on:click={() => toast.remove(t.id)}>
			<XMark w="w-4" h="h-4" />
		</button>
	{/if}
</div>
