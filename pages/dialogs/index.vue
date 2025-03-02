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
        <div class="dialogs__count">
          Количество диалогов: {{ dialogs?.count }}
        </div>
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

        <div class="dialogs__pagination">
          <UPagination
            v-model="currentPage"
            :page-count="200"
            :total="dialogsCount"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
const profileStore = useProfileStore();

const dialogs = ref({});
const isFetching = ref(true);

async function fetchDialogs(offset = 0) {
  isFetching.value = true;

  const response = await $fetch("/api/dialogs", {
    method: "POST",
    body: {
      offset,
    },
  });

  dialogs.value = response;
  profileStore.fillProfiles(response.profiles, response.groups);

  isFetching.value = false;
}

fetchDialogs();

const currentPage = ref(1);

watch(currentPage, () => {
  const offset = (currentPage.value - 1) * 200;
  fetchDialogs(offset);
  window.scrollTo(0, 0);
});

const dialogsCount = computed(() => {
  if (!dialogs.value?.count) {
    return 0;
  }

  return dialogs.value?.count;
});
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

  &__count {
    margin-bottom: 20px;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
