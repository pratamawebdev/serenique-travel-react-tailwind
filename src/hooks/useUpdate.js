import axios from "axios";
import useLocalStorage from "./useLocalStorage";

const useUpdate = (endpoint) => {
  const [token, setToken] = useLocalStorage("authToken", "");
  const updateItem = (id, updatedItem) => {
    return axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/${endpoint}/${id}`,
        updatedItem,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  };

  return { updateItem };
};

export default useUpdate;
