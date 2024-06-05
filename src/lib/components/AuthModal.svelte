<script lang="ts">
	import { authModalStore } from '$lib/stores/authModalStore.svelte';
	import LoginModal from './LoginModal.svelte';
	import SignupModal from './SignupModal.svelte';
	import { gsap } from 'gsap';
	import { page } from "$app/stores"
	import { goto } from "$app/navigation"

    $effect(() => {
        gsap.fromTo(".modal", { scale: 0 }, { scale: 1, duration: 0.5 })
    })

    const closeModal = () => {
        gsap.to(".modal", {
        scale: 0, duration: 0.5, onComplete: () => {
          authModalStore.openModal = false
		  if ($page.url.pathname === "/marathon") {
			goto("/")
		  }
        }
      });
    }

</script>

<div
	class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center p-5 backdrop-brightness-50 z-50"
>
	<div
		class="w-full max-w-[500px] rounded-2xl bg-white z-10 p-8 flex flex-col gap-5 justify-center relative overflow-hidden modal"
	>
		<button
			onclick={closeModal}
			class="absolute right-0 top-0 w-[35px] aspect-square grid place-content-center bg-purple-900"
		>
			<iconify-icon class="text-white text-2xl" icon="ic:baseline-close"></iconify-icon>
		</button>
		{#if authModalStore.type === 'login'}
			<LoginModal />
		{/if}
		{#if authModalStore.type === 'signup'}
			<SignupModal />
		{/if}
	</div>
</div>
