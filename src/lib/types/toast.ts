import type { ComponentType } from "svelte";

export type Toast = {
  /** Random nanoid generated when adding a new toast. Used to remove toast later */
  id: string;

  type:
    | "success"
    | "info"
    | "warning"
    | "error"
    | "primary"
    | "secondary"
    | "accent";
  message: string;
  html?: boolean;

  /** How many ms to show for before removing */
  duration_ms?: number;

  icon?: ComponentType | string;

  /** Remove toast when navigating to a new route */
  clear_on_navigate?: boolean;
};

export type AddToastOptions = {
  /** Only add if queue is empty */
  if_empty?: boolean;
  /** Clear queue before adding */
  clear_queue?: boolean;
};
