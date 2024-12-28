<template>
  <div class="dialogs">
    <UContainer>
      <div class="dialogs__list">
        <template v-for="dialog in dialogs.items">
          <DialogItem
            :dialog="dialog"
            :dialogInfo="
              getDialogInfoById(
                dialog.conversation.peer.id,
                dialog.conversation.peer.type,
              )
            "
          />
          <UDivider class="divider"></UDivider>
        </template>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import DialogItem from "~/components/DialogItem.vue";

const { data: dialogs } = await useFetch("/api/dialogs");

const dialogsInfo = ref({});

function getDialogInfoById(peerId, peerType) {
  if (dialogsInfo.value[peerId]) {
    return dialogsInfo.value[peerId];
  }

  if (peerType === "user") {
    const info = dialogs.value.profiles.find(
      (profile) => profile.id === peerId,
    );
    dialogsInfo.value[peerId] = info;
    return info;
  }

  if (peerType === "group") {
    const info = dialogs.value.groups.find((group) => -group.id === peerId);
    dialogsInfo.value[peerId] = info;
    return info;
  }

  return null;
}
</script>

<style scoped lang="scss">
.divider {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
