<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { getUserImage } from '$lib/appwrite/api';
	import useLoading from '$lib/customHooks/useLoading.svelte.js';

	const { data } = $props();

    const { action: logout, loading: loggingOut } = useLoading(async () => {
        await fetch("/api/auth/logout", { method: "POST"})
        await invalidateAll()
        goto("/")
    })

</script>

<div class="w-full h-full overflow-auto relative p-2 flex flex-col gap-5">
	<div class="flex flex-col items-center mt-5">
		<img
			class="w-[150px] aspect-square rounded-full object-cover"
			src={data.user?.image}
			alt="User profile"
		/>
        <p class="font-bold text-2xl mt-2">{data.user?.username}</p>
	</div>
    <div class="mt-5">
        <div class="flex justify-between items-center p-3 text-lg">
            <p class="font-bold">Email</p>
            <p>{data.user?.email}</p>
        </div>
        <div class="flex justify-between items-center p-3 text-lg">
            <p class="font-bold">Password</p>
            <p>{data.user?.password}</p>
        </div>
    </div>
    <a href="/profile/edit" class="primary-btn text-sm p-3">Edit profile</a>

    <button disabled={loggingOut.value} onclick={logout} class="secondary-btn text-sm p-3 mt-4 flex justify-center items-center gap-2"> <iconify-icon icon="ic:round-logout"></iconify-icon>{loggingOut.value ? "Logging out" : "Logout"}</button>
</div>
