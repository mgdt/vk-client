import { vk } from "../vk";

export default defineEventHandler(async (event) => {
  const friendsIds = await vk(event)("friends.get", {
    params: {
      order: "hints",
      count: 5,
    },
  });

  return await vk(event)("users.get", {
    params: {
      user_ids: friendsIds.items.join(","),
    },
  });
});
