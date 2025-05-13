<template>
  <div class="attachments">
    <UContainer>
      <div class="attachments__list">
        <AttachmentPhoto
          v-for="attach in attachments"
          :attach="attach.attachment"
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup>
const route = useRoute();

const peerId = route.params.id;
const attachmentsType = route.query.type;

const attachments = ref([]);

async function fetchAttachments() {
  try {
    const response = await $fetch("/api/dialog-attachments", {
      method: "POST",
      body: {
        offset: 0,
        peerId: peerId,
        attachmentTypes: attachmentsType,
      },
    });

    attachments.value.push(...response.items);
  } catch (error) {
    console.log("Ошибка загрузки вложений", error);
  }
}

onMounted(() => {
  fetchAttachments();
});
</script>

<style scoped lang="scss">
.attachments {
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
