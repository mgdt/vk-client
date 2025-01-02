export const useProfileStore = defineStore("profiles", () => {
  const profiles = ref({});
  const groups = ref({});

  function fillProfiles(_profiles, _groups) {
    if (_profiles?.length > 0) {
      for (let i = 0; i < _profiles.length; i++) {
        const profile = _profiles[i];
        profiles.value[profile.id] = profile;
      }
    }

    if (_groups?.length > 0) {
      for (let i = 0; i < _groups.length; i++) {
        const group = _groups[i];
        groups.value[group.id] = group;
      }
    }
  }

  function getProfileById(id) {
    if (id < 0) {
      return groups.value[-id];
    }

    return profiles.value[id];
  }

  return { profiles, groups, fillProfiles, getProfileById };
});
