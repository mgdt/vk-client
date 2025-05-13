import { vk } from "../vk";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await vk(event)("messages.getHistoryAttachments", {
    params: {
      offset: body.offset,
      peer_id: body.peerId,
      media_type: body.attachmentTypes,
      count: 200,
    },
  });
});
