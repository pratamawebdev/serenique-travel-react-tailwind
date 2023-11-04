import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import useUpdate from "../../../hooks/useUpdate";
import AdminLayouts from "../Wrapper/AdminLayouts";
import { Switch } from "@headlessui/react";
import Button from "../../Elements/Button/Index";
import Loader from "../../Fragments/Global/Loader";
import Alert from "../../Fragments/Global/Alert";

const UserLayouts = () => {
  const [dataUser, setDataUser] = useState([]);
  const [visibleData, setVisibleData] = useState(6); // Jumlah data yang ditampilkan
  const { data, loading, error } = useFetch("api/v1/all-user");
  const { updateItem } = useUpdate("api/v1/update-user-role");
  const [alert, setAlert] = useState({ show: false, message: "" });

  const handleRoleToggle = async (userId, currentRole) => {
    try {
      const updatedRole = currentRole === "admin" ? "user" : "admin";

      const payload = await updateItem(userId, { role: updatedRole });
      if (payload.status === "OK") {
        setDataUser((prev) => {
          const indexData = prev.findIndex((v) => v.id === userId);
          const tempData = [...prev];
          tempData[indexData].role = updatedRole;
          return tempData;
        });

        setAlert({
          show: true,
          message: payload.message,
          headerMessage: "Success!",
          style: "text-green-700 bg-green-200 border-green-400",
        });

        setTimeout(() => {
          setAlert({ show: false, message: "" });
        }, 3000);
      }
    } catch (error) {
      setAlert({
        show: false,
        message: error.message,
        headerMessage: "Failed!",
        style: "text-red-700 bg-red-100 border-red-400",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 3000);
      console.error("Error updating user role:", error);
    }
  };

  useEffect(() => {
    if (data.data) {
      setDataUser(data.data);
    }
  }, [data]);

  const loadMore = () => {
    setVisibleData((prevVisibleData) => prevVisibleData + 6);
  };

  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };

  return (
    <AdminLayouts>
      {alert.show && (
        <Alert
          headerMessage={alert.headerMessage}
          message={alert.message}
          classname={`fixed w-96 right-10 ${alert.style} top-20`}
          onClose={handleAlertClose}
        />
      )}
      <p className="mb-6 text-3xl font-bold text-darkColor dark:text-white">
        Users
      </p>
      {error && <p>{error?.message}</p>}
      {loading ? (
        <div className="absolute top-1/2 left-[43%] md:left-1/2">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {dataUser.slice(0, visibleData).map((user, i) => (
              <div
                key={i}
                className="text-black bg-white rounded-lg shadow-md dark:bg-gray-700 h-80"
              >
                <img
                  alt="profile picture"
                  className="object-cover w-32 h-32 mx-auto align-middle rounded-full mt-7"
                  src={user.profilePictureUrl}
                />
                <figcaption className="mt-5 text-center">
                  <p className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
                    {user.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-300">
                    <span className="font-medium">{user.email}</span>
                  </p>
                  <p className="text-gray-500 dark:text-gray-300">
                    <span className="font-medium">{user.phoneNumber}</span>
                  </p>
                  <div className="mt-4">
                    <label className="mr-2 text-gray-700 dark:text-white">
                      Admin
                    </label>
                    <Switch
                      className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                        user.role === "admin"
                          ? "bg-green-600"
                          : "bg-primaryColor"
                      }`}
                      onClick={() => handleRoleToggle(user.id, user.role)} // Call the role toggle function
                    >
                      <span className="sr-only">Toggle role</span>
                      <span
                        className={`${
                          user.role === "admin"
                            ? "translate-x-1"
                            : "translate-x-6"
                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                      />
                    </Switch>
                    <label className="ml-2 text-gray-700 dark:text-white">
                      User
                    </label>
                  </div>
                </figcaption>
              </div>
            ))}
          </div>
          {visibleData < dataUser.length && (
            <div className="flex items-center justify-center py-8">
              <Button
                classname="px-4 py-2 text-white rounded-full bg-primaryColor"
                onClick={loadMore}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </AdminLayouts>
  );
};

export default UserLayouts;
