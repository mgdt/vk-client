<template>
  <div class="profile">
    <UContainer>
      <div class="profile__info" v-if="profile">
        <img class="profile__image" :src="profile.photo_200" alt="" />
        <a
          :href="`https://vk.com/id${profile.id}`"
          target="_blank"
          class="profile__name"
        >
          {{ profile.first_name }} {{ profile.last_name }}
        </a>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
const { data: profile } = useFetch("/api/profile", {
  lazy: true,
});
</script>

<style scoped lang="scss">
.profile {
  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 40px;
  }

  &__title {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 24px;
  }

  &__image {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }

  &__name {
    text-decoration: none;
  }

  &__friends {
    &-list {
      display: flex;
      flex-direction: column;
      gap: 5px;

      a {
        text-decoration: none;
      }
    }
  }
}
</style>
