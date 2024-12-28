import { accessToken } from "~/server/settings";

export const vk = $fetch.create({
  baseURL: "https://api.vk.com/method/",
  method: "POST",
  params: {
    access_token: accessToken,
    v: "5.199",
  },
  onRequest: (context) => {
    // console.log(context);
  },
  onResponse: (context) => {
    // console.log(context);
  },
  parseResponse: (response) => JSON.parse(response).response,
});
