<template>
  <div class="dialogs">
    <UContainer>
      <div v-if="isFetching" class="dialogs__list">
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
            :author="profileStore.getProfileById(dialog.conversation.peer.id)"
          />
          <UDivider class="divider"></UDivider>
        </template>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
const profileStore = useProfileStore();

const dialogs = ref([]);
const isFetching = ref(true);

async function fetchDialogs() {
  isFetching.value = true;
  const response = await $fetch("/api/dialogs");

  dialogs.value = response;

  profileStore.fillProfiles(response.profiles, response.groups);

  isFetching.value = false;
}

fetchDialogs();
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
