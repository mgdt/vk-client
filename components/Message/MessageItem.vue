<template>
  <div class="message">
    <img class="message__image" :src="props.author?.photo_50" alt="" />
    <div class="message__info">
      <p class="message__author">
        {{ props.author?.first_name }} {{ props.author?.last_name }}
      </p>
      <div class="message__body">
        <p class="message__text text-slate-400">{{ props.message.text }}</p>
        <div
          v-if="props.message?.attachments?.length > 0"
          class="message__attachments"
        >
          <MessageAttachments :attachments="props.message.attachments" />
        </div>
        <div
          v-if="props.message?.fwd_messages?.length > 0"
          class="message__fwd"
        >
          <MessageItem
            v-for="msg in props.message.fwd_messages"
            :message="msg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: Object,
    default: null,
  },
  author: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped lang="scss">
.message {
  display: flex;
  align-items: start;
  gap: 10px;

  &__image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  &__author {
    margin-bottom: 5px;
  }

  &__text {
    font-size: 14px;
    margin-top: 0;
  }

  &__fwd {
    margin-left: 20px;
  }
}
</style>
