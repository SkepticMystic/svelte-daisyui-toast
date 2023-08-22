import type { AddToastOptions, Toast } from "$lib/types/toast";
import { nanoid } from "nanoid";
import { writable } from "svelte/store";

const store = writable<Toast[]>([]);

const remove = (id: Toast["id"]) =>
  store.update((old) => old.filter((t) => t.id !== id));

const DEFAULT_ADD_TOAST_OPTIONS: AddToastOptions = {
  ifEmpty: false,
  clearQueue: false,
};

const add = (
  newToast: Omit<Toast, "id">,
  addToastOptions?: AddToastOptions,
) => {
  const { clearQueue, ifEmpty } = Object.assign({
    ...DEFAULT_ADD_TOAST_OPTIONS,
  }, addToastOptions);

  const id = nanoid(6);

  store.update((old) => {
    // Don't add if queue has items and ifEmpty is true
    if (ifEmpty && old.length > 0) {
      return old;
    } // Clear queue and add
    else if (clearQueue) {
      return [{ ...newToast, id }];
    } // Otherwise, add to queue
    else {
      return [...old, { ...newToast, id }];
    }
  });

  return { id };
};

const addInfo = (
  message: string,
  extras?: {
    newToast?: Omit<Toast, "id" | "type" | "message">;
    addToastOptions?: AddToastOptions;
  },
) =>
  add({
    type: "info",
    message,
    ...extras?.newToast,
  }, extras?.addToastOptions);

const addSuccess = (
  message: string,
  extras?: {
    newToast?: Omit<Toast, "id" | "type" | "message">;
    addToastOptions?: AddToastOptions;
  },
) =>
  add(
    { type: "success", message, ...extras?.newToast },
    extras?.addToastOptions,
  );

const addWarning = (
  message: string,
  extras?: {
    newToast?: Omit<Toast, "id" | "type" | "message">;
    addToastOptions?: AddToastOptions;
  },
) =>
  add(
    { type: "warning", message, ...extras?.newToast },
    extras?.addToastOptions,
  );

const addError = (
  message: string,
  extras?: {
    newToast?: Omit<Toast, "id" | "type" | "message">;
    addToastOptions?: AddToastOptions;
  },
) =>
  add({
    type: "error",
    message,
    ...extras?.newToast,
  }, extras?.addToastOptions);

export const toast = {
  ...store,

  /** Push a toast onto the store, generating and returning a nanoid */
  add,
  addInfo,
  addSuccess,
  addWarning,
  addError,

  /** Remove a toast from the store by id */
  remove,
};
