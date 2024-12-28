import { vk } from "../vk";

export default defineEventHandler(async (event) => {
  const friendsIds = await vk("friends.get", {
    params: {
      order: "hints",
      count: 5,
    },
  });

  return await vk("users.get", {
    params: {
      user_ids: friendsIds.items.join(","),
    },
  });
});
