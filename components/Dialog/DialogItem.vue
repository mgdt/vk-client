<template>
  <div class="dialog__wrapper">
    <div class="dialog">
      <div class="dialog__left">
        <template v-if="props.dialog.conversation.peer.type === 'chat'">
          <img
            v-if="props.dialog.conversation?.chat_settings?.photo?.photo_50"
            class="dialog__image"
            :src="props.dialog.conversation?.chat_settings.photo.photo_50"
            alt=""
          />
          <div v-else class="dialog__image">
            {{ props.dialog.conversation.chat_settings.title[0] }}
          </div>
        </template>

        <img v-else class="dialog__image" :src="props.author.photo_50" alt="" />

        <div class="dialog__info">
          <NuxtLink
            :to="`/dialogs/${props.dialog.conversation.peer.id}`"
            target="_blank"
            class="dialog__title"
          >
            {{ dialogTitle }}
            <span v-if="props.dialog?.count" style="color: gray">
              ({{ props.dialog?.count }})
            </span>
          </NuxtLink>
          <p class="dialog__message text-slate-400">
            {{ props.dialog.last_message.text?.slice(0, 200) }}
          </p>
        </div>
      </div>

      <div class="dialog__attachments">
        <NuxtLink
          target="_blank"
          :to="`/dialogs/attachments/${props.dialog.conversation.peer.id}?type=photo`"
        >
          Фото
        </NuxtLink>
        <NuxtLink
          target="_blank"
          :to="`/dialogs/attachments/${props.dialog.conversation.peer.id}?type=video`"
        >
          Видео
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  dialog: {
    type: Object,
    default: null,
  },
  author: {
    type: Object,
    default: null,
  },
});

const dialogTitle = computed(() => {
  if (props.dialog.conversation.peer.type === "chat") {
    return props.dialog.conversation.chat_settings.title;
  }
  if (props.dialog.conversation.peer.type === "group") {
    return props.author.name;
  }
  if (props.dialog.conversation.peer.type === "user") {
    return props.author.first_name + " " + props.author.last_name;
  }
  return null;
});
</script>

<style scoped lang="scss">
.dialog {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(90deg, #374471, #307c9d, #5eb2b5);
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  &__message {
    font-size: 14px;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__attachments {
    display: flex;
    gap: 10px;
  }
}
</style>
