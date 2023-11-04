import axios from "axios";

export const apiCall = async (method, url, data, headers) => {
  const token = localStorage.getItem("authToken");
  const config = {
    method: method,
    url: url,
    headers: {
      apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
    },
  };
  if (data) {
    config.data = data;
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (headers) {
    config.headers = { ...config.headers, ...headers };
  }
  let result = {
    status: "Gagal",
    code: "500",
    message: "Internal server error",
  };

  await axios(config)
    .then((response) => (result = response.data))
    .catch((error) => (result = error.response));
  return result;
};
