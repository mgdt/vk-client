<template>
  <NuxtLoadingIndicator />
  <UHorizontalNavigation
    :links="links"
    class="border-b border-gray-200 dark:border-gray-800"
  />
  <div class="page">
    <NuxtPage />
  </div>
</template>

<script setup>
const profile = useState("profile", "Grigoriy");

const links = [
  {
    label: "Главная",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "Профиль",
    icon: "i-heroicons-user",
    to: "/profile",
  },
  {
    label: "Друзья",
    icon: "i-heroicons-users",
    to: "/friends",
  },
  {
    label: "Диалоги",
    icon: "i-heroicons-chat-bubble-oval-left-ellipsis",
    to: "/dialogs",
  },
];
</script>

<style scoped lang="scss">
.page {
  padding-top: 20px;
}
</style>
