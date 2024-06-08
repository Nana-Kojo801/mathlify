<script>
	import { Circle } from 'svelte-loading-spinners';
	import { superForm } from 'sveltekit-superforms';

	const { data } = $props();

	const { form, errors, submitting, message, enhance } = superForm(data.form);
</script>

<div class="w-full h-full flex justify-center items-center px-7">
	<div class="w-full flex flex-col gap-3">
		<p class="text-3xl text-purple-900 font-bold">Signup</p>
		{#if $message}
			<p class="text-red-500 bg-red-300 p-3 text-sm rounded-sm grid place-content-center">
				{$message}
			</p>
		{/if}
		<form class="flex flex-col gap-7 mt-3" use:enhance method="post">
			<div class="flex flex-col relative">
				<div class="relative flex items-center">
					<input
						class="w-full h-full p-3 text-sm bg-gray-100 border-none outline-2 outline-purple-900 rounded-sm"
						type="text"
						placeholder="Username"
						name="username"
						bind:value={$form.username}
					/>
					<iconify-icon class="absolute right-3" icon="bxs:user"></iconify-icon>
				</div>
				{#if $errors.username}
					<p class="text-sm text-red-500">{$errors.username}</p>
				{/if}
			</div>
			<div class="flex flex-col relative">
				<div class="relative flex items-center">
					<input
						class="w-full h-full p-3 text-sm bg-gray-100 border-none outline-2 outline-purple-900 rounded-sm"
						type="email"
						placeholder="Email"
						name="email"
						bind:value={$form.email}
					/>
					<iconify-icon class="absolute right-3" icon="ic:round-email"></iconify-icon>
				</div>
				{#if $errors.email}
					<p class="text-sm text-red-500">{$errors.email}</p>
				{/if}
			</div>
			<div class="flex flex-col relative">
				<div class="relative flex items-center">
					<input
						class="w-full h-full p-3 text-sm bg-gray-100 border-none outline-2 outline-purple-900 rounded-sm"
						type="password"
						placeholder="Password"
						name="password"
						bind:value={$form.password}
					/>
					<iconify-icon class="absolute right-3" icon="streamline:padlock-square-1-solid"
					></iconify-icon>
				</div>
				{#if $errors.password}
					<p class="text-sm text-red-500">{$errors.password}</p>
				{/if}
			</div>
			<button disabled={$submitting} class="p-3 grid place-content-center text-sm bg-purple-900 text-white rounded-sm">
				{#if $submitting}
					<Circle color="white" size={20} />
				{:else}
					Signup
				{/if}
			</button>
		</form>
		<p class="text-center mt-1">Already have an account? <a class="text-purple-900" href="/login">Login</a></p>
	</div>
</div>
