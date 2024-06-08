// env.d.ts

import type { User } from '$lib/types';
import type { Models } from 'node-appwrite';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			account: Models.User<Models.Preferences> | null,
			user: User | null
		}
		interface PageData {
			user: User | null,
		}
		// interface Platform {}
	}
}

export {};
