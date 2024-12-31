<template>
  <div class="search">
    <UContainer>
      <form @submit.prevent="handleSubmit" class="search__form">
        <UInput v-model="query" class="search__input"></UInput>
        <UButton type="submit">Найти</UButton>
      </form>

      <template v-if="firstFetched">
        <div v-if="messages.length > 0" class="dialog__list">
          <template v-for="message in messages" :key="message.id">
            <MessageItem
              :message="message"
              :author="profileStore.getProfileById(message.from_id)"
            />
            <UDivider class="divider" />
          </template>
          <UButton :disabled="isFetching" @click="offset += 100" class="mt-2">
            {{ isFetching ? "Загрузка..." : "Загрузить еще" }}
          </UButton>
        </div>
        <div v-else-if="isFetching" class="dialog__list">
          <template v-for="_ in 20">
            <DialogSkeleton />
            <UDivider class="divider" />
          </template>
        </div>
        <template v-else>
          <p>Ничего не найдено</p>
        </template>
      </template>
    </UContainer>
  </div>
</template>

<script setup>
const profileStore = useProfileStore();
const query = ref("");
const offset = ref(0);
const firstFetched = ref(false);
const isFetching = ref(false);

const messages = ref([]);

async function search() {
  firstFetched.value = true;
  isFetching.value = true;

  const response = await $fetch("/api/search", {
    method: "POST",
    body: {
      offset: offset.value,
      q: query.value,
    },
  });

  messages.value.push(...response.items);

  if (response?.profiles?.length > 0) {
    for (const profile of response?.profiles) {
      profileStore.profiles[profile.id] = profile;
    }
  }

  if (response?.groups?.length > 0) {
    for (const group of response?.groups) {
      profileStore.groups[group.id] = group;
    }
  }

  isFetching.value = false;
}

function handleSubmit() {
  messages.value = [];
  search();
}

watch(offset, () => {
  search();
});
</script>

<style scoped lang="scss">
.search {
  &__form {
    width: 100%;
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }

  &__input {
    flex-grow: 1;
  }
}

.divider {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
