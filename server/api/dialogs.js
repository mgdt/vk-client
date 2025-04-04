import { vk } from "../vk";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await vk(event)("messages.getConversations", {
    params: {
      filter: "all",
      extended: 1,
      count: 200,
      offset: body?.offset || 0,
    },
  });
});
