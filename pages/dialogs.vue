<template>
  <div class="dialogs">
    <UContainer>
      <div class="dialog__list">
        <div class="dialog__item">
          <UDivider></UDivider>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
const { data: dialogs } = useFetch("/api/dialogs");

const users = ref({});

function getUserById(id) {}
</script>
