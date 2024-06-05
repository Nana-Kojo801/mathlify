<script>
    const navLinks = [
    {
      name: "Home",
      href: "/",
      icon: "ph:house-fill"
    },
    {
      name: "Marathon",
      href: "/marathon",
      icon: "cil:running"
    },
    {
      name: "Levels",
      href: "/levels",
      icon: "icon-park-solid:game-ps"
    },
    {
      name: "Practice",
      href: "/practice",
      icon: "ic:round-model-training"
    },
  ];
</script>

<footer class="flex justify-evenly items-center p-2">
    {#each navLinks as links}
        <a class="flex flex-col items-center" href="{links.href}">
            <iconify-icon class="text-purple-900 text-xl" icon={links.icon}></iconify-icon>
            <p class="text-sm text-purple-900">{links.name}</p>
        </a>
    {/each}
</footer>