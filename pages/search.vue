<template>
  <div class="search">
    <UContainer>
      <h1>Поиск</h1>

      <form @submit.prevent="handleSubmit" class="search__form">
        <UInput
          v-model="query"
          class="search__input"
          placeholder="Поиск"
        ></UInput>
        <UButton type="submit">Найти</UButton>
      </form>

      <template v-if="firstFetched">
        <div class="search__count">Найдено: {{ messagesCount }}</div>
        <div v-if="messages.length > 0" class="dialog__list">
          <template v-for="message in messages" :key="message.id">
            <MessageItem
              class="search__item"
              :message="message"
              :author="profileStore.getProfileById(message.from_id)"
            />
          </template>
          <UButton :disabled="isFetching" @click="offset += 100" class="mt-2">
            {{ isFetching ? "Загрузка..." : "Загрузить еще" }}
          </UButton>
        </div>
        <div v-else-if="isFetching" class="dialog__list">
          <template v-for="_ in 20">
            <DialogSkeleton />
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
const messagesCount = ref(0);

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

  messagesCount.value = response.count;
  messages.value.push(...response.items);

  profileStore.fillProfiles(response?.profiles, response?.groups);

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
h1 {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 15px;
}

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

  &__count {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  &__item {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #202a37;
  }
}
</style>
