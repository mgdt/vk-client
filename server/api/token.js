import { vk } from "../vk";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = body.token;

  setCookie(event, "token", token);

  return await vk(event)("account.getProfileInfo");
});
