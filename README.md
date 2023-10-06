# Svelte-DaisyUI-Toast

A simple toast component for Svelte with [DaisyUI](https://daisyui.com/) styling.

## Installation

```bash
npm i svelte-daisyui-toast
```

## Quick Start

You'll need a Svelte project with [DaisyUI installed](https://daisyui.com/docs/install/).

1. Add the styles to your `tailwind.config.js` file:

```diff
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
+		'./node_modules/svelte-daisyui-toast/dist/**/*.{js,svelte}',
	]
	// ...
};
```

2. Add the `<Toaster />` component to your `+layout.svelte` file.
3. Add new toasts using the methods on the `toast` store.

```svelte
<script>
	import { Toaster, toast } from 'svelte-daisyui-toast';
</script>

<slot />

<button on:click={() => toast.addInfo('Hello, world!')}> Add Toast </button>

<Toaster />
```

## Types

Some types used in the API.

```ts
/** Represents an individual toast in the store */
type Toast = {
	/** Random nanoid generated when adding a new toast. Used to remove toast later */
	id: string;

	/** Type of toast. Affects which DaisyUI styles are applied */
	type: 'success' | 'info' | 'warning' | 'error';

	/** Message to display in the toast */
	message: string;
	/** Whether to render the message as HTML. Defaults to false */
	html?: boolean;

	/** How many milliseconds to show for before removing.
	 * If not set, toast will not be removed automatically.
	 */
	duration_ms?: number;

	/** Show an icon on the left side of the toast.
	 * Can be a component or a string.
	 */
	icon?: ComponentType | string;

	/** Only render toast if `showOnRoutes.some(route => $page.url.path.startsWith(route))`.
	 * By default, shows on all routes
	 */
	showOnRoutes?: string[];

	/** Remove toast when navigating away from the current route.
	 * By default, toast will not be removed when navigating away
	 */
	clearOnNavigation?: boolean;
};

export type AddToastOptions = {
	/** Only add if queue is empty */
	ifEmpty?: boolean;
	/** Clear queue before adding */
	clearQueue?: boolean;
};
```

## API

### Adding a toast

The base method to add new toasts to the store is `toast.add`:

```ts
function add(
	toast: Omit<Toast, 'id'>,
	addToastOptions?: AddToastOptions
): {
	/** The id of the new toast */
	id: string;
};
```

There are also shorthand methods to add each `type` of toast (each with the same function signature):

```ts
function addTYPE(
	message: string,
	extras?: {
		newToast?: Omit<Toast, 'id' | 'type' | 'message'>;
		addToastOptions?: AddToastOptions;
	}
): { id: string };
```

The full list of shorthands is:

- `toast.addSuccess`
- `toast.addInfo`
- `toast.addWarning`
- `toast.addError`

For example, `toast.addSuccess('Hello, world!')` is equivalent to `toast.add({ type: 'success', message: 'Hello, world!' })`.

### Removing a toast

To remove a toast, use `toast.remove`, passing in the `id` of the toast to remove:

```ts
function remove(id: string): void;
```

## Toaster Component

The `<Toaster />` component is used to render the toasts in the store. It should be placed in your `+layout.svelte` file.

It accepts the following props:

### `alignment`

Determines where the toasts are rendered on the screen. Defaults to bottom-right

```ts
{
	x?: 'start' | 'center' | 'end';
	y?: 'top' | 'middle' | 'bottom';
}
```

These values _align_ (👀) with the [DaisyUI classes for the Toast component](https://daisyui.com/components/toast/).
