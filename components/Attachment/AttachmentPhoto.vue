<template>
  <NuxtLink target="_blank" :to="attach?.photo?.orig_photo?.url" class="attach">
    <img :src="attach?.photo?.sizes?.[1]?.url" alt="" />
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  attach: {
    type: Object,
    default: () => null,
  },
});
</script>

<style scoped lang="scss"></style>
