<script lang="ts">
	import { page } from '$app/stores';
	import XMark from '$lib/components/icons/XMark.svelte';
	import { toast } from '$lib/stores/toast.js';
	import type { Toast } from '$lib/types/toast.js';
	import { scale } from 'svelte/transition';
	import TimerWheel from './TimerWheel.svelte';

	const alertTypes: Record<Toast['type'], string> = {
		info: 'alert-info',
		success: 'alert-success',
		warning: 'alert-warning',
		error: 'alert-error'
	};
</script>

<div class="toast">
	{#each $toast as { id, message, html, icon, type, duration_ms, showOnRoutes } (id)}
		<!-- showOnRoutes -->
		{#if !showOnRoutes?.length || showOnRoutes.some((r) => $page.url.pathname.startsWith(r))}
			<div class="alert {alertTypes[type]} flex justify-between grow" out:scale={{ duration: 300 }}>
				<div class="flex items-center gap-3">
					<!-- icon -->
					{#if typeof icon === 'string'}
						<span>{icon}</span>
					{:else}
						<svelte:component this={icon} />
					{/if}

					<div>
						<!-- html -->
						{#if html}
							{@html message}
						{:else}
							{message}
						{/if}
					</div>
				</div>

				<!-- duration_ms -->
				{#if duration_ms}
					<!-- Only set the timeout when the toast is rendered. This allows it to work with showOnRoutes -->
					{@const _timer = setTimeout(() => toast.remove(id), duration_ms)}

					<TimerWheel
						{duration_ms}
						on:click={() => {
							toast.remove(id);
							clearTimeout(_timer);
						}}
					>
						<XMark w="w-4" h="h-4" />
					</TimerWheel>
				{:else}
					<button class="btn btn-sm btn-circle btn-ghost" on:click={() => toast.remove(id)}>
						<XMark w="w-4" h="h-4" />
					</button>
				{/if}
			</div>
		{/if}
	{/each}
</div>
