<template>
  <div class="dialog">
    <UContainer>
      <div v-if="messages.length > 0" class="dialog__list">
        <template v-for="message in messages" :key="message.id">
          <MessageItem
            class="dialog__item"
            :message="message"
            :author="profileStore.getProfileById(message.from_id)"
          />
        </template>
        <UButton :disabled="isFetching" @click="offset += 200" class="mt-2">
          {{ isFetching ? "Загрузка..." : "Загрузить еще" }}
        </UButton>
      </div>
      <div v-else class="dialog__list">
        <template v-for="_ in 20">
          <DialogSkeleton />
        </template>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
const route = useRoute();
const profileStore = useProfileStore();
const peerId = route.params.id;

const messages = ref([]);
const offset = ref(0);
const isFetching = ref(false);

async function fetchMessages() {
  isFetching.value = true;

  const response = await $fetch("/api/dialog", {
    method: "POST",
    body: {
      peerId: peerId,
      offset: offset.value,
    },
  });

  messages.value.push(...response.items);
  isFetching.value = false;

  profileStore.fillProfiles(response?.profiles, response?.groups);
}

fetchMessages();

watch(offset, () => {
  fetchMessages();
});
</script>

<style scoped lang="scss">
.dialog {
  &__item {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #202a37;
  }
}
</style>
