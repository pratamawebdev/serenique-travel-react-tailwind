import { Navigate, Outlet } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";

const ProtectedProfile = ({ children }) => {
  const [token, setToken] = useLocalStorage("authToken", "");
  const [role, setRole] = useLocalStorage("role", "");

  if (!token || token === "undefined") {
    return <Navigate to={"/login"} />;
  }

  return <div> {children || <Outlet />} </div>;
};

export default ProtectedProfile;
