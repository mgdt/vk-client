import { vk } from "../vk";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await vk("messages.search", {
    params: {
      offset: body.offset,
      q: body.q,
      count: 100,
      extended: 1,
    },
  });
});
