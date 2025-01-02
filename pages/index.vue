<template>
  <UContainer>
    <h1>Установить токен</h1>
    <form @submit.prevent="handleSubmit">
      <UInput v-model="token" class="input" placeholder="Токен"></UInput>
      <UButton type="submit">Сохранить</UButton>
    </form>
  </UContainer>
</template>

<script setup>
const token = ref("");

async function handleSubmit() {
  const response = await $fetch("/api/token", {
    method: "POST",
    body: {
      token: token.value,
    },
  });

  console.log(response);
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 15px;
}

form {
  display: flex;
  gap: 10px;
}

.input {
  flex-grow: 1;
}
</style>
