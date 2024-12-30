<template>
  <div class="message">
    <img
      class="message__image"
      src="https://sun72-2.userapi.com/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&sign=10ad7d7953daabb7b0e707fdfb7ebefd&u=I6EtahnrCRLlyd0MhT2raQt6ydhuyxX4s72EHGuUSoM&cs=50x50"
      alt=""
    />
    <div class="message__info">
      <p class="message__author">Глеб Поздеев</p>
      <p class="message__text">Пол часика еще</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    default: null,
  },
});
</script>

<style scoped lang="scss">
.message {
  display: flex;
  align-items: center;
  gap: 10px;

  &__image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  &__text {
    font-size: 14px;
  }
}
</style>
<script setup lang="ts"></script>
