<template>Attachments</template>

<script setup>
const route = useRoute();

const peerId = route.params.id;
const attachmentsType = route.query.type;

const { data } = await useFetch("/api/dialog-attachments", {
  method: "POST",
  body: {
    offset: 0,
    peerId: peerId,
    attachmentTypes: attachmentsType,
  },
});

console.log(peerId);
console.log(data.value);
</script>
