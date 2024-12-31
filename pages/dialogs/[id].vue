<template>
  <div class="dialog">
    <UContainer>
      <div v-if="dialogInfo" class="dialog__list">
        <template v-for="message in dialogInfo.items" :key="message.id">
          <MessageItem
            :message="message"
            :author="profileStore.getProfileById(message.from_id)"
          />
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

const dialogInfo = ref(null);

async function fetchMessages(offset = 0) {
  const response = await $fetch("/api/dialog", {
    method: "POST",
    body: {
      peerId: peerId,
      offset,
    },
  });

  dialogInfo.value = response;

  for (const profile of response?.profiles) {
    profileStore.profiles[profile.id] = profile;
  }

  for (const group of response?.groups) {
    profileStore.groups[group.id] = group;
  }
}

fetchMessages();
</script>

<style scoped lang="scss">
.divider {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
