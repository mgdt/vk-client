import { vk } from "../vk";

export default defineEventHandler(async (event) => {
  return await vk(event)("messages.getConversations", {
    params: {
      filter: "all",
      extended: 1,
      count: 200,
    },
  });
});
