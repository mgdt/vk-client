<template>
  <div class="dialog">
    <UContainer>
      <div v-if="dialogInfo" class="dialog__list">
        <template v-for="message in dialogInfo.items" :key="message.id">
          <MessageItem
            :message="message"
            :author="getAuthorById(message.from_id)"
          />
          <UDivider class="divider" />
        </template>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
const route = useRoute();
const profile = useState("profile");

console.log(profile);

const peerId = route.params.id;

const dialogInfo = ref(null);
const authors = ref({});

async function fetchMessages(offset = 0) {
  const response = await $fetch("/api/dialog", {
    method: "POST",
    body: {
      peerId: peerId,
      offset,
    },
  });

  dialogInfo.value = response;
}

function getAuthorById(id) {
  if (!dialogInfo.value) {
    return null;
  }

  if (authors.value[id]) {
    return authors.value[id];
  }

  console.log("getAuthorById call");

  const author = dialogInfo.value.profiles.find((profile) => profile.id === id);
  authors.value[id] = author;

  return author;
}

onMounted(() => {
  fetchMessages();
});
</script>

<style scoped lang="scss">
.divider {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
