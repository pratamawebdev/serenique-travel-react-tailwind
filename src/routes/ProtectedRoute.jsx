import { Navigate, Outlet } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";

const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useLocalStorage("authToken", "");
  const [role, setRole] = useLocalStorage("role", "");

  if (!token || token === "undefined") {
    return <Navigate to={"/login"} />;
  } else if (role !== "admin" || role === "") {
    return <Navigate to={"*"} />;
  }

  return <div> {children || <Outlet />} </div>;
};

export default ProtectedRoute;
