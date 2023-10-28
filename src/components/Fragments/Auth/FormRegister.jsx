import { useState } from "react";
import useCreate from "../../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../../../hooks/useLocalStorage";

const FormRegister = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("admin");
  const [phoneNumber, setPhoneNumber] = useState();
  const navigate = useNavigate();
  const [profilePictureName, setProfilePictureName] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [token, setToken] = useLocalStorage("authToken", "");

  const { createItem: handleRegister } = useCreate("api/v1/register");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (profilePictureFile.size > 500 * 1024) {
        return alert("Gambar yang diunggah lebih dari 500kb");
      }
      let data = new FormData();
      data.append("image", profilePictureFile);
      const updatePhoto = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        data,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const registerData = {
        email,
        name,
        password,
        passwordRepeat,
        role,
        profilePictureUrl:
          updatePhoto.data.status === "OK" ? updatePhoto.data.url : "",
        phoneNumber,
      };
      const createdItem = await handleRegister(registerData);
      console.log("Register successful:", createdItem);
      navigate("/login");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
      <div className="flex flex-row gap-2 w-[100%]">
        <div className="flex flex-col pt-4 w-[50%]">
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-8 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex flex-col pt-4 w-[50%]">
          <input
            type="text"
            id="name"
            placeholder="your name"
            onChange={(e) => setName(e.target.value)}
            className="w-full h-8 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none sm:w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="flex flex-row gap-2 w-[100%]">
        <div className="flex flex-col pt-4 w-[50%]">
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-8 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col pt-4 w-[50%]">
          <input
            type="password"
            id="confirm_password"
            placeholder="Confirm Password"
            onChange={(e) => setPasswordRepeat(e.target.value)}
            className="w-full h-8 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="pt-4">
        <select
          name=""
          id=""
          onChange={(e) => setRole(e.target.value)}
          className="w-full h-8 px-3 mt-1 leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>
            Pilih satu opsi
          </option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="flex flex-col pt-4">
        <input
          type="tel"
          id="phone_number"
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full h-8 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex flex-col pt-4">
        <input
          type="file"
          value={profilePictureName}
          placeholder="Profile Picture Url"
          onChange={(e) => {
            setProfilePictureName(e.target.value);
            setProfilePictureFile(e.target.files[0]);
          }}
          className="text-darkColor dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="p-2 mt-6 h-8 items-center flex justify-center text-md font-bold text-white bg-[#015AB8] hover:bg-gray-700 rounded"
      >
        Register
      </button>
    </form>
  );
};

export default FormRegister;
