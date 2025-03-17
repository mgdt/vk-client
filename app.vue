<template>
  <NuxtLoadingIndicator />
  <UHorizontalNavigation
    :links="links"
    class="border-b border-gray-200 dark:border-gray-800 fixed bg-[#121212]"
  />
  <div class="page">
    <NuxtPage />
  </div>

  <UNotifications />
</template>

<script setup>
const links = [
  {
    label: "Токен",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "Профиль",
    icon: "i-heroicons-user",
    to: "/profile",
  },
  {
    label: "Диалоги",
    icon: "i-heroicons-chat-bubble-oval-left-ellipsis",
    to: "/dialogs",
  },
  {
    label: "Поиск",
    icon: "i-heroicons-magnifying-glass-16-solid",
    to: "/search",
  },
];
</script>

<style scoped lang="scss">
.page {
  padding-top: 60px;
  padding-bottom: 40px;
}
</style>
