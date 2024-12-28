<template>
  <div class="profile">
    <div class="container">
      <h2 class="profile__title">Профиль</h2>

      <div class="profile__info" v-if="profileData?.info">
        <img class="profile__image" :src="profileData.info.photo_200" alt="" />
        <a
          :href="`https://vk.com/id${profileData.info.id}`"
          target="_blank"
          class="profile__name"
        >
          {{ profileData.info.first_name }} {{ profileData.info.last_name }}
        </a>
      </div>

      <div class="profile__friends" v-if="profileData?.friends">
        <h3 class="profile__friends-title">Друзья</h3>
        <div class="profile__friends-list">
          <a
            v-for="friend in profileData?.friends"
            :href="`https://vk.com/id${friend.id}`"
            target="_blank"
          >
            {{ friend.first_name }} {{ friend.last_name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
async function fetchProfileInfo() {
  return await $fetch("/api/profile");
}

async function fetchFriends() {
  return await $fetch("/api/friends");
}

const { data: profileData } = await useAsyncData("profile", async () => {
  const [info, friends] = await Promise.all([
    fetchProfileInfo(),
    fetchFriends(),
  ]);

  return {
    info,
    friends,
  };
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

  &__image {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }

  &__name {
    color: black;
    text-decoration: none;
  }

  &__friends {
    &-list {
      display: flex;
      flex-direction: column;
      gap: 5px;

      a {
        color: black;
        text-decoration: none;
      }
    }
  }
}
</style>
