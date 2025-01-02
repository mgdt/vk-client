<template>
  <div class="message">
    <p class="message__date text-slate-400">{{ messageDate }}</p>
    <img class="message__image" :src="props.author?.photo_50" alt="" />
    <div class="message__info">
      <p v-if="props.message.from_id > 0" class="message__author">
        {{ props.author?.first_name }} {{ props.author?.last_name }}
      </p>
      <p v-else class="message__author">
        {{ props.author?.name }}
      </p>
      <div class="message__body">
        <p class="message__text text-slate-400">{{ props.message.text }}</p>
        <div
          v-if="props.message?.attachments?.length > 0"
          class="message__attachments"
        >
          <MessageAttachments :attachments="props.message.attachments" />
        </div>
        <p v-if="props.message.action" class="message__action text-green-400">
          Действие с чатом
        </p>
        <div
          v-if="props.message?.fwd_messages?.length > 0"
          class="message__fwd"
        >
          <template v-for="msg in props.message.fwd_messages" :key="msg.id">
            <MessageItem
              :message="msg"
              :author="profileStore.getProfileById(msg.from_id)"
            />
            <UDivider class="divider" />
          </template>
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

const profileStore = useProfileStore();

const dateFormatter = new Intl.DateTimeFormat("ru", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
  hour: "numeric",
  minute: "numeric",
});

const messageDate = computed(() => {
  if (!props.message.date) {
    return null;
  }

  const date = new Date(props.message.date * 1000);

  return dateFormatter.format(date);
});
</script>

<style scoped lang="scss">
.message {
  display: flex;
  align-items: start;
  gap: 10px;
  position: relative;
  width: 100%;

  &__date {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 13px;
  }

  &__info {
    width: 100%;
  }

  &__body {
    width: 100%;
  }

  &__image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  &__action {
    font-size: 14px;
  }

  &__author {
    margin-bottom: 5px;
  }

  &__attachments {
    margin-top: 6px;
  }

  &__text {
    font-size: 14px;
    margin-top: 0;
    white-space: break-spaces;
    word-break: break-all;
  }

  &__fwd {
    margin-top: 20px;
    padding-left: 5px;
    width: 100%;
    border-left: 1px solid rgb(31, 41, 55);
  }
}

.divider {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
