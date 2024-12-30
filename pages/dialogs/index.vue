<template>
  <div class="dialogs">
    <UContainer>
      <div v-if="status === 'pending'" class="dialogs__list">
        <template v-for="_ in 20">
          <DialogSkeleton />
          <UDivider class="divider"></UDivider>
        </template>
      </div>

      <div v-else class="dialogs__list">
        <template
          v-for="dialog in dialogs?.items"
          :key="dialog.conversation.peer.id"
        >
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
import DialogItem from "~/components/Dialog/DialogItem.vue";
import DialogSkeleton from "~/components/Dialog/DialogSkeleton.vue";

const { data: dialogs, status } = useFetch("/api/dialogs", {
  lazy: true,
});

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

.dialogs {
  &__skeleton-image {
    width: 50px;
    height: 50px;
  }
}
</style>
