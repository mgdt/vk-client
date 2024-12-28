import { vk } from "../vk";

export default defineEventHandler(async (event) => {
  return await vk("account.getProfileInfo");
});
