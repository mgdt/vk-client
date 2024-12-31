<template>
  <div class="dialog">
    <UContainer>
      <div v-if="messages.length > 0" class="dialog__list">
        <template v-for="message in messages" :key="message.id">
          <MessageItem
            :message="message"
            :author="profileStore.getProfileById(message.from_id)"
          />
          <UDivider class="divider" />
        </template>
        <UButton :disabled="isFetching" @click="offset += 200" class="mt-2">
          {{ isFetching ? "Загрузка..." : "Загрузить еще" }}
        </UButton>
      </div>
      <div v-else class="dialog__list">
        <template v-for="_ in 20">
          <DialogSkeleton />
          <UDivider class="divider" />
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

  for (const profile of response?.profiles) {
    profileStore.profiles[profile.id] = profile;
  }

  for (const group of response?.groups) {
    profileStore.groups[group.id] = group;
  }

  isFetching.value = false;
}

fetchMessages();

watch(offset, () => {
  fetchMessages();
});
</script>

<style scoped lang="scss">
.divider {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
