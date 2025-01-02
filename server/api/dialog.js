import { vk } from "../vk";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await vk(event)("messages.getHistory", {
    params: {
      offset: body.offset,
      peer_id: body.peerId,
      count: 200,
      extended: 1,
    },
  });
});
