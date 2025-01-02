export function vk(event) {
  const token = getCookie(event, "token") || null;

  return $fetch.create({
    baseURL: "https://api.vk.com/method/",
    method: "POST",
    params: {
      access_token: token,
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
}
