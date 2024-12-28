const config = useRuntimeConfig();

export const vk = $fetch.create({
  baseURL: "https://api.vk.com/method/",
  method: "POST",
  params: {
    access_token: config.accessToken,
    v: "5.199",
  },
  parseResponse: (response) => JSON.parse(response).response,
});
