<template>
  <div class="dialogs">
    <UContainer>
      <div v-if="isFetching" class="dialogs__list">
        <template v-for="_ in 20">
          <DialogSkeleton />
        </template>
      </div>

      <div v-else class="dialogs__list">
        <div class="dialogs__top">
          <span>Количество диалогов: {{ dialogs?.count }}</span>
          <div class="dialogs__buttons">
            <UButton @click="fetchDialogsLength">Количество сообщений</UButton>
            <UButton @click="fetchDialogsLength">Сортировка</UButton>
          </div>
        </div>
        <template
          v-for="dialog in dialogs?.items"
          :key="dialog.conversation.peer.id"
        >
          <DialogItem
            @mouseover.once="fetchDialogLength(dialog)"
            class="dialogs__item"
            :dialog="dialog"
            :author="profileStore.getProfileById(dialog.conversation.peer.id)"
          />
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

  try {
    const response = await $fetch("/api/dialogs", {
      method: "POST",
      body: {
        offset,
      },
    });

    dialogs.value = response;
    profileStore.fillProfiles(response.profiles, response.groups);
  } catch (error) {
    console.log("Ошибка загрузки диалогов", error);
  } finally {
    isFetching.value = false;
  }
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

async function fetchDialogLength(dialog) {
  const peerId = dialog?.conversation?.peer?.id;

  if (!peerId) {
    return;
  }

  const response = await $fetch("/api/dialog", {
    method: "POST",
    body: {
      peerId: peerId,
      offset: 0,
    },
  });

  dialog.count = response.count;
}

async function fetchDialogsLength() {
  if (!dialogs.value?.items) {
    return;
  }

  for (const dialog of dialogs.value.items) {
    await fetchDialogLength(dialog);
    await sleep(100);
  }
}
</script>

<style scoped lang="scss">
.dialogs {
  &__skeleton-image {
    width: 50px;
    height: 50px;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__buttons {
    display: flex;
    gap: 10px;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  &__item {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #202a37;
  }
}
</style>
