import { useEffect, useState } from "react";
import useCreate from "../../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../../../hooks/useLocalStorage";
import Modal from "../Global/Modal";
import Alert from "../Global/Alert";

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
  const [showPreview, setShowPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "" });

  const { createItem: handleRegister } = useCreate("api/v1/register");

  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };

  const validateForm = () => {
    let isValid = true;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (name.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(
        "Password' field length must be greater than or equal to 6 characters long"
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (passwordRepeat.trim() === "") {
      setPasswordRepeatError("Password repeat is required");
      isValid = false;
    } else if (password !== passwordRepeat) {
      setPasswordRepeatError("Passwords do not match");
      isValid = false;
    } else {
      setPasswordRepeatError("");
    }

    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [name, email, password, passwordRepeat]);

  const openImagePreview = () => {
    if (profilePictureFile) {
      const imageUrl = URL.createObjectURL(profilePictureFile);
      setPreviewImageUrl(imageUrl);
      setShowPreview(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let urlFoto = "";
      if (profilePictureFile) {
        const acceptImage = ["image/"];
        if (
          !acceptImage.some((item) => profilePictureFile.type.includes(item))
        ) {
          return setAlert({
            show: true,
            message: "Files that are allowed are only of type Image",
            headerMessage: "Failed!",
            style: "text-red-700 bg-red-100 border-red-400 w-96",
          });
        }
        setTimeout(() => {
          setAlert({ show: false, message: "" });
        }, 3000);
        if (profilePictureFile?.size > 500 * 1024) {
          return setAlert({
            show: true,
            message: "File size exceeds 500 kb",
            headerMessage: "Failed!",
            style: "text-red-700 bg-red-100 border-red-400 w-96",
          });
        }
        setTimeout(() => {
          setAlert({ show: false, message: "" });
        }, 3000);
        let data = new FormData();
        data.append("image", profilePictureFile);
        await axios
          .post(
            "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
            data,
            {
              headers: {
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.data.status === "OK") {
              urlFoto = response.data.url;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      const registerData = {
        email,
        name,
        password,
        passwordRepeat,
        role,
        profilePictureUrl: urlFoto,
        phoneNumber,
      };
      const createdItem = await handleRegister(registerData);
      setAlert({
        show: true,
        message: createdItem.message,
        headerMessage: "Success!",
        style: "text-green-700 bg-green-200 border-green-400 w-96",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "" });
        navigate("/login");
      }, 3000);
      console.log("Register successful:", createdItem);
    } catch (error) {
      setAlert({
        show: true,
        message: error?.response?.data?.message,
        headerMessage: "Failed!",
        style: "text-red-700 bg-red-100 border-red-400 w-96",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 3000);
      console.error("Error:", error);
    }
  };

  return (
    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
      {alert?.show && (
        <Alert
          headerMessage={alert.headerMessage}
          message={alert.message}
          classname={`fixed right-10 ${alert.style} top-20`}
          onClose={handleAlertClose}
        />
      )}
      <div className="flex flex-row gap-2 w-[100%]">
        <div className="flex flex-col pt-4 w-[50%]">
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-8 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          <p className="text-xs text-red-600">{emailError}</p>
        </div>

        <div className="flex flex-col pt-4 w-[50%]">
          <input
            type="text"
            id="name"
            placeholder="your name"
            onChange={(e) => setName(e.target.value)}
            className="w-full h-8 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none sm:w-full focus:outline-none focus:shadow-outline"
          />
          <p className="text-xs text-red-600">{nameError}</p>
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
          <p className="text-xs text-red-600">{passwordError}</p>
        </div>
        <div className="flex flex-col pt-4 w-[50%]">
          <input
            type="password"
            id="confirm_password"
            placeholder="Confirm Password"
            onChange={(e) => setPasswordRepeat(e.target.value)}
            className="w-full h-8 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          <p className="text-xs text-red-600">{passwordRepeatError}</p>
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

      <div className="flex flex-col gap-2 pt-4">
        <input
          type="file"
          value={profilePictureName}
          accept="image/*"
          onChange={(e) => {
            setProfilePictureName(e.target.value);
            setProfilePictureFile(e.target.files[0]);
          }}
          className="text-darkColor dark:text-white"
        />
        <button
          type="button"
          onClick={openImagePreview}
          className="p-2 mt-2 h-8 items-center flex justify-center text-md font-bold text-white bg-[#015AB8] hover:bg-gray-700 rounded"
        >
          Preview Image
        </button>
      </div>

      <button
        disabled={!isFormValid}
        type="submit"
        className="p-2 mt-6 h-8 items-center flex justify-center text-md font-bold text-white bg-[#015AB8] hover:bg-gray-700 rounded"
      >
        Register
      </button>
      <Modal
        classname="items-center rounded-full w-96 h-96"
        isVisible={showPreview}
        onClose={() => setShowPreview(false)}
      >
        <img
          src={previewImageUrl}
          alt="Pratinjau Gambar"
          className="object-cover rounded-full w-[95%] h-[95%]"
        />
      </Modal>
    </form>
  );
};

export default FormRegister;
