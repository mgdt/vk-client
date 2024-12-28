<template>
  <div class="dialog__wrapper">
    <div class="dialog">
      <div
        v-if="dialog.conversation.peer.type === 'chat'"
        class="dialog__image"
      >
        {{ dialog.conversation.chat_settings.title[0] }}
      </div>
      <img v-else class="dialog__image" :src="dialogInfo.photo_50" alt="" />

      <div class="dialog__info">
        <p class="dialog__title">
          {{ dialogTitle }}
        </p>
        <p class="dialog__message">
          {{ dialog.last_message.text?.slice(0, 200) }}
        </p>
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
  dialogInfo: {
    type: Object,
    default: null,
  },
});

const dialogTitle = computed(() => {
  if (props.dialog.conversation.peer.type === "chat") {
    return props.dialog.conversation.chat_settings.title;
  }
  if (props.dialog.conversation.peer.type === "group") {
    return props.dialogInfo.name;
  }
  if (props.dialog.conversation.peer.type === "user") {
    return props.dialogInfo.first_name + " " + props.dialogInfo.last_name;
  }
  return null;
});
</script>

<style scoped lang="scss">
.dialog {
  display: flex;
  align-items: center;
  gap: 10px;

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
    color: lightgray;
  }
}
</style>
