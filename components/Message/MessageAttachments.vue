<template>
  <div class="attach">
    <template v-for="attachment in props.attachments">
      <div v-if="attachment.type === 'link'" class="attach__item">
        <a
          class="attach__item-link text-green-400"
          target="_blank"
          :href="attachment.link.url"
        >
          {{ attachment.link.title }}
        </a>
      </div>

      <div v-else-if="attachment.type === 'video'" class="attach__item">
        <a
          class="attach__item-link text-green-400"
          target="_blank"
          :href="attachment.video.player"
        >
          Видео
        </a>
      </div>

      <div v-else-if="attachment.type === 'photo'" class="attach__item">
        <a :href="attachment.photo.orig_photo.url" target="_blank">
          <img
            class="attach__item-photo"
            :src="attachment.photo.sizes[2].url"
            alt=""
          />
        </a>
      </div>

      <div v-else-if="attachment.type === 'gift'" class="attach__item">
        <img class="attach__item-gift" :src="attachment.gift.thumb_96" alt="" />
      </div>

      <div v-else-if="attachment.type === 'wall'" class="attach__item">
        <p class="text-green-500">Запись со стены</p>
      </div>

      <div v-else-if="attachment.type === 'sticker'" class="attach__item">
        <p class="text-green-500">Стикер</p>
      </div>

      <div v-else-if="attachment.type === 'call'" class="attach__item">
        <p class="text-green-500">Звонок</p>
      </div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  attachments: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped lang="scss">
.attach {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  &__item {
    font-size: 14px;

    &-photo {
      width: 150px;
      height: 150px;
      object-fit: cover;
    }

    &-gift {
      width: 50px;
      height: 50px;
    }

    &-link {
      text-decoration: underline;
      font-size: 14px;
    }
  }
}
</style>
