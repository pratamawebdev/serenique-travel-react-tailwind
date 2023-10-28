import axios from "axios";
import useLocalStorage from "./useLocalStorage";

const useDelete = (endpoint) => {
  const [token, setToken] = useLocalStorage("authToken", "");
  const deleteItem = (id) => {
    return axios
      .delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/${endpoint}/${id}`,
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

  return { deleteItem };
};

export default useDelete;
