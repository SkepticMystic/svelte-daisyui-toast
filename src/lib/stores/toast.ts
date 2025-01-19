import type { AddToastOptions, Toast } from "$lib/types/toast.js";
import { nanoid } from "nanoid";
import { get, writable } from "svelte/store";

const store = writable<Toast[]>([]);
const defaults = writable<Partial<Omit<Toast, "id" | "type" | "message">>>({});

const remove = (id: Toast["id"]) =>
  store.update((old) => old.filter((t) => t.id !== id));

const add = (input: Omit<Toast, "id">, options?: AddToastOptions) => {
  const { clear_queue, if_empty } = Object.assign(
    {
      ...({
        if_empty: false,
        clear_queue: false,
      } satisfies AddToastOptions),
    },
    options,
  );

  const toast = { ...get(defaults), ...input, id: nanoid(6) };

  store.update((old) => {
    // Don't add if queue has items and if_empty is true
    if (if_empty && old.length > 0) {
      return old;
    } // Clear queue and add
    else if (clear_queue) {
      return [toast];
    } // Otherwise, add to queue
    else {
      old.push(toast);
      return old;
    }
  });

  return toast;
};

const info = (
  message: string,
  input?: Omit<Toast, "id" | "type" | "message">,
  options?: AddToastOptions,
) => add({ type: "info", message, ...input }, options);

const success = (
  message: string,
  input?: Omit<Toast, "id" | "type" | "message">,
  options?: AddToastOptions,
) => add({ type: "success", message, ...input }, options);

const warning = (
  message: string,
  input?: Omit<Toast, "id" | "type" | "message">,
  options?: AddToastOptions,
) => add({ type: "warning", message, ...input }, options);

const error = (
  message: string,
  input?: Omit<Toast, "id" | "type" | "message">,
  options?: AddToastOptions,
) => add({ type: "error", message, ...input }, options);

export const toast = {
  ...store,

  defaults,

  /** Push a toast onto the store, generating and returning a nanoid */
  add,
  info,
  success,
  warning,
  error,

  /** Remove a toast from the store by id */
  remove,
};
