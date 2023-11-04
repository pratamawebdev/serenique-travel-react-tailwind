import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import AdminLayouts from "../Wrapper/AdminLayouts";
import axios from "axios";
import useLocalStorage from "../../../hooks/useLocalStorage";
import Loader from "../../Fragments/Global/Loader";
import useCreate from "../../../hooks/usePost";
import Alert from "../../Fragments/Global/Alert";

const ProfileLayouts = () => {
  const { data, loading, error, reFetch } = useFetch("api/v1/user");
  const { createItem } = useCreate("api/v1/update-profile");
  const [token, setToken] = useLocalStorage("authToken", "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePictureName, setProfilePictureName] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber,
    profilePictureUrl: "",
  });

  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };

  const handleUpdateProfile = async (e) => {
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
      const updatedData = {
        name: formData?.name,
        email: formData?.email,
        phoneNumber: formData?.phoneNumber,
        profilePictureUrl: urlFoto,
      };
      const updatedItem = await createItem(updatedData);
      reFetch();
      setAlert({
        show: true,
        message: updatedItem?.message,
        headerMessage: "Success!",
        style: "text-green-700 bg-green-200 border-green-400 w-96",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 3000);
      console.log("Update successful:", updatedItem);
    } catch (error) {
      setAlert({
        show: false,
        message: error?.message,
        headerMessage: "Failed!",
        style: "text-red-700 bg-red-100 border-red-400 w-96",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 3000);
      console.error("Error update:", error);
    }
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || data?.data?.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <AdminLayouts>
      {alert?.show && (
        <Alert
          headerMessage={alert.headerMessage}
          message={alert.message}
          classname={`fixed right-10 ${alert.style} top-20`}
          onClose={handleAlertClose}
        />
      )}
      <p className="mb-16 text-3xl font-bold text-gray-700 dark:text-white">
        Profile
      </p>
      {loading ? (
        <div className="absolute top-1/2 left-[43%] md:left-1/2">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-5 pb-8 lg:grid-cols-6">
          {data && (
            <div className="flex flex-col justify-center p-6 shadow-md lg:col-span-3 rounded-xl sm:px-12 dark:bg-darkColor dark:text-gray-100">
              <img
                src={data.data.profilePictureUrl}
                alt=""
                className="object-cover w-32 h-32 mx-auto border border-gray-400 rounded-full dark:bg-gray-500 aspect-square"
              />
              <div className="space-y-4 text-center divide-y divide-gray-700">
                <div className="my-2 space-y-1">
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    {data.data.name}
                  </h2>
                  <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                    {data.data.role}
                  </p>
                </div>
                <div className="flex justify-center pt-2 space-x-4 align-center">
                  Phone: {data.data.phoneNumber}
                </div>
              </div>
            </div>
          )}
          <div className="col-span-1 p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:border-none dark:bg-darkColor lg:col-span-3 shadow-black/5">
            <form
              className="flex flex-col items-start justify-between mb-4"
              onSubmit={handleUpdateProfile}
            >
              <div className="font-medium dark:text-white">Edit Profile:</div>
              <div className="w-full pt-4">
                <input
                  type="text"
                  id="name"
                  placeholder="your name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full h-8 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none sm:w-full focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-full pt-4">
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full h-8 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-full pt-4">
                <input
                  type="tel"
                  id="phone_number"
                  placeholder="Phone Number"
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="w-full h-8 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex w-full pt-4 dark:text-white">
                <input
                  type="file"
                  placeholder="Profile Picture Url"
                  value={profilePictureName}
                  onChange={(e) => {
                    setProfilePictureName(e.target.value);
                    setProfilePictureFile(e.target.files[0]);
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full h-10 mt-4 text-white rounded shadow-md bg-primaryColor hover:bg-blue-700"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayouts>
  );
};

export default ProfileLayouts;
