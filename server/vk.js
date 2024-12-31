const config = useRuntimeConfig();

export const vk = $fetch.create({
  baseURL: "https://api.vk.com/method/",
  method: "POST",
  params: {
    access_token: config.accessToken,
    v: "5.199",
  },
  parseResponse: (response) => {
    const result = JSON.parse(response);

    if (result.error) {
      return result;
    }

    return result.response;
  },
});
