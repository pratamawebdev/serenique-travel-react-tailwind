import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import useLocalStorage from "../../../hooks/useLocalStorage";
import axios from "axios";
import Loader from "./Loader";

const ProfileDropdown = ({ showProfileName, classname }) => {
  const { data, loading, error } = useFetch("api/v1/user");
  const [token, setToken] = useLocalStorage("authToken", "");
  const [role, setRole] = useLocalStorage("role", "");

  if (loading) {
    return <Loader classname="w-5 h-5" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (!data || data.data.length === 0) {
    return <p>No data available.</p>;
  }

  const handleLogout = async () => {
    try {
      await axios
        .get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setToken("");
          setRole("");
          window.location.href = "/login";
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      {data && (
        <div>
          <Menu.Button className="inline-flex items-center justify-center w-full">
            <img
              src={data.data.profilePictureUrl}
              className="object-cover border-2 border-white rounded-full shadow-sm w-7 h-7 md:mr-4"
              alt="profile_picture"
            />
            {showProfileName && (
              <span className="hidden font-medium text-darkColor dark:text-white md:block">
                {data.data.name}
              </span>
            )}
          </Menu.Button>
        </div>
      )}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform scale-95"
        enterTo="transform scale-100"
        leave="transition ease-in duration=75"
        leaveFrom="transform scale-100"
        leaveTo="transform scale-95"
      >
        <Menu.Items
          className={`absolute right-0 z-50 w-56 mt-2 origin-top-right dark:bg-white bg-darkColor rounded shadow-sm ${classname}`}
        >
          <div className="p-1">
            <Menu.Item>
              <Link
                to="/profile"
                className="flex items-center p-2 text-sm text-white transition-colors rounded dark:text-darkColor hover:bg-blue-400 hover:text-white group"
              >
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="/dashboard"
                className="flex items-center p-2 text-sm text-white transition-colors rounded dark:text-darkColor hover:bg-blue-400 hover:text-white group"
              >
                Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                onClick={handleLogout}
                to="#"
                className="flex items-center p-2 text-sm text-white transition-colors rounded dark:text-darkColor hover:bg-blue-400 hover:text-white group"
              >
                Logout
              </Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
