<script lang="ts">
	import { getUserImage } from '$lib/appwrite/api';
	import { Circle } from 'svelte-loading-spinners';
	import { superForm } from 'sveltekit-superforms';

	const { data } = $props();

	const { form, errors, submitting, message, enhance } = superForm(data.form);

	let userImage = $state<string>(
		!data.user?.image ? (getUserImage(data.user?.username!) as unknown as string) : data.user.image
	);
	let imageChanged = $state<boolean>(false)
	let fileInput = $state<HTMLInputElement>();
	let shouldUpdate = $state(false)

	form.subscribe(({ username, password }) => {
		shouldUpdate = username !== data.user?.username || password !== data.user?.password || imageChanged
	})

	const handleFileChange = async () => {
		if (!fileInput?.files) return;
		const file = fileInput.files[0];
		const imageUrl = URL.createObjectURL(file);
		userImage = imageUrl;
		imageChanged = true
		shouldUpdate = true
	};
</script>

<div class="w-full h-full overflow-auto relative p-2 flex flex-col gap-5">
	<div class="flex flex-col items-center mt-5">
		<img
			class="w-[150px] aspect-square rounded-full object-cover"
			src={userImage}
			alt="User profile"
		/>
		<button onclick={() => fileInput?.click()} class="text-purple-900 text-base mt-3"
			>Edit profile pic</button
		>
	</div>
	<form use:enhance method="post" enctype="multipart/form-data" class="mt-7 flex flex-col gap-6">
		{#if $message}
			<p class="text-red-500 bg-red-300 p-3 text-sm rounded-sm grid place-content-center">
				{$message}
			</p>
		{/if}
		<input
			bind:this={fileInput}
			onchange={handleFileChange}
			name="image"
			type="file"
			class="hidden"
		/>
		<div class="flex flex-col gap-2">
			<label class="font-bold text-md" for="username">Username</label>
			<div class="relative flex items-center">
				<input
					class="w-full h-full p-3 text-sm bg-gray-100 border-none outline-2 outline-purple-900 rounded-sm"
                    id="username"
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
		<div class="flex flex-col gap-2">
			<label class="font-bold text-md" for="password">Password</label>
			<div class="flex flex-col relative">
				<div class="relative flex items-center">
					<input
						class="w-full h-full p-3 text-sm bg-gray-100 border-none outline-2 outline-purple-900 rounded-sm"
                        id="password"
						type="password"
						placeholder="Password"
						name="password"
						bind:value={$form.password}
					/>
					<iconify-icon class="absolute right-3" icon="streamline:padlock-square-1-solid"
					></iconify-icon>
				</div>
			</div>
			{#if $errors.password}
				<p class="text-sm text-red-500">{$errors.password}</p>
			{/if}
		</div>
		<button disabled={($submitting || !shouldUpdate) as boolean} class="primary-btn p-3 text-sm grid place-content-center disabled:bg-gray-300"
			>{#if $submitting}
				<Circle color="purple" size={20} />
			{:else}
				Edit profile
			{/if}</button
		>
	</form>
</div>
