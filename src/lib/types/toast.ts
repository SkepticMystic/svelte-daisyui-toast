import type { ComponentType } from 'svelte';

export type Toast = {
	/** Random nanoid generated when adding a new toast. Used to remove toast later */
	id: string;

	type: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'secondary' | 'accent';
	message: string;
	html?: boolean;

	/** How many ms to show for before removing */
	duration_ms?: number;

	icon?: ComponentType | string;

	/** Only render toast if current $page.url.path.startsWith(route).
	 * By default, shows on all routes
	 */
	showOnRoutes?: string[];
};

export type AddToastOptions = {
	/** Only add if queue is empty */
	ifEmpty?: boolean;
	/** Clear queue before adding */
	clearQueue?: boolean;
};
