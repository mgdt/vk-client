<template>
  <div class="dialog">
    <UContainer>
      <MessageItem />
    </UContainer>
  </div>
</template>

<script setup>
const route = useRoute();

const peerId = route.params.id;

async function fetchMessages(offset = 0) {
  const response = await $fetch("/api/dialog", {
    method: "POST",
    body: {
      peerId: peerId,
      offset,
    },
  });

  console.log(response);
}

onMounted(async () => {
  fetchMessages();
});
</script>
