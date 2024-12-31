export const useProfileStore = defineStore("profiles", () => {
  const profiles = ref({});
  const groups = ref({});

  function getProfileById(id) {
    if (id < 0) {
      return groups.value[-id];
    }

    return profiles.value[id];
  }

  return { profiles, groups, getProfileById };
});
