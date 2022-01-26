import { writable } from 'svelte/store';

export const modalNumber = writable(null);
export const modalPostId = writable(null);
export const isAdmin = writable(false);
export const authorId = writable(0);