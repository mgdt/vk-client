import { vk } from "../vk";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = body.token;

  setCookie(event, "token", token);

  return {
    status: "ok",
  };
});
