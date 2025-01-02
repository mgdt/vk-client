<template>
  <UContainer>
    <h1>Установить токен</h1>
    <form @submit.prevent="handleSubmit">
      <UInput v-model="token" class="input" placeholder="Токен"></UInput>
      <UButton type="submit">Сохранить</UButton>
    </form>
    <p
      class="result-message"
      :class="{ 'text-red-500': error, 'text-green-600': !error }"
      v-if="message"
    >
      {{ message }}
    </p>
  </UContainer>
</template>

<script setup>
const token = ref("");
const error = ref(false);
const message = ref("");

async function handleSubmit() {
  error.value = false;
  message.value = "";

  await $fetch("/api/token", {
    method: "POST",
    body: {
      token: token.value,
    },
  });

  token.value = "";

  const response = await $fetch("/api/profile");

  if (response?.error?.error_msg) {
    message.value = response.error.error_msg;
    error.value = true;
    return;
  }

  message.value = "Токен установлен успешно";
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

.result-message {
  margin-top: 10px;
  font-size: 14px;
}
</style>
