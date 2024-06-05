<script lang="ts">
	import { appwrite } from '$lib/appwrite/appwrite';
	import { SignupSchema } from '$lib/schemas/schema';
	import { authModalStore } from '$lib/stores/authModalStore.svelte';
	import { userStore } from '$lib/stores/userStore.svelte';
	import { ID } from 'appwrite';
	import type { EventHandler } from 'svelte/elements';
	import { ZodError } from 'zod';

	let loading = $state(false);
	let formData = $state({ username: '', password: '', email: '' });
	let errors = $state<{ field: any; form: string | null }>({ field: {}, form: null });

	const handleSubmit: EventHandler = async (e: Event) => {
		e.preventDefault();
		try {
            loading = true;
			SignupSchema.parse(formData);
			await appwrite.account.create(
				ID.unique(),
				formData.email,
				formData.password,
				formData.username
			);
			await appwrite.account.createEmailPasswordSession(formData.email, formData.password);
			await userStore.createUser(formData);
            await userStore.setUser(await appwrite.account.get())
			authModalStore.openModal = false;
		} catch (err) {
			if (err instanceof ZodError) {
                console.log('zod error');
                
				errors.field = err.flatten().fieldErrors;
			} else {
                errors.form = (err as Error).message;
            }
		} finally {
			loading = false;
		}
	};
</script>

<div class="flex flex-col gap-4">
	<p class="mt-5 text-2xl text-purple-900 font-bold">Create account</p>
	{#if errors.form}
		<p class="bg-red-400 text-red-600 py-3 px-5 rounded-[5px] text-sm">{errors.form}</p>
	{/if}
	<form onsubmit={handleSubmit} class="flex flex-col gap-8 mt-2">
		<div>
			<div>
				<input
					class="p-3 w-full text-sm rounded-[5px] indent-1 bg-gray-100 outline-2 outline-purple-900"
					type="text"
					placeholder="Username"
					bind:value={formData.username}
				/>
			</div>
			{#if errors.field.username}
				<p class="text-xs text-red-600 mt-1">{errors.field.username}</p>
			{/if}
		</div>
		<div>
			<div>
				<input
					class="p-3 w-full text-sm rounded-[5px] indent-1 bg-gray-100 outline-2 outline-purple-900"
					type="email"
					placeholder="Email"
					bind:value={formData.email}
				/>
			</div>
			{#if errors.field.email}
				<p class="text-xs text-red-600 mt-1">{errors.field.email}</p>
			{/if}
		</div>
		<div>
			<div>
				<input
					class="p-3 w-full text-sm rounded-[5px] indent-1 bg-gray-100 outline-2 outline-purple-900"
					type="password"
					placeholder="Password"
					bind:value={formData.password}
				/>
			</div>
			{#if errors.field.password}
				<p class="text-xs text-red-600 mt-1">{errors.field.password}</p>
			{/if}
		</div>
		<button disabled={loading} class="primary-btn rounded-[5px] text-sm p-3 disabled:bg-purple-600">
			{loading ? 'Creating account...' : 'Create account'}
		</button>
	</form>
	<div class="text-center text-sm flex gap-1 m-auto">
		<p>Already have an account?</p>
		<button
			onclick={() => (authModalStore.type = 'login')}
			class="border-none text-sm bg-transparent text-purple-900"
		>
			Login
		</button>
	</div>
</div>
