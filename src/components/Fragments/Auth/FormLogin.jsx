import { useState, useRef, useEffect } from "react";
import useCreate from "../../../hooks/usePost"; // Ganti dengan path yang benar
import useLocalStorage from "../../../hooks/useLocalStorage";
import Alert from "../Global/Alert";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useLocalStorage("authToken", "");
  const [role, setRole] = useLocalStorage("role", "");
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "" });

  const { createItem: handleLogin } = useCreate("api/v1/login");

  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = { email, password };
      const createdItem = await handleLogin(loginData);
      console.log("Login successful:", createdItem);
      setToken(createdItem.token || createdItem.data);
      setRole(createdItem.data.role);
      setAlert({
        show: true,
        message: createdItem.message,
        headerMessage: "Success!",
        style: "text-green-700 bg-green-200 border-green-400 w-96",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "" });
        window.location.href = "/";
      }, 3000);
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
      console.error("Error during login:", error);
    }
  };

  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setEmailError(isEmailValid || email.trim() === "" ? "" : "Invalid email");

    setIsFormValid(
      email.trim() !== "" && password.trim() !== "" && isEmailValid
    );
  }, [email, password]);

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
      <div className="flex flex-col pt-4">
        <label htmlFor="email" className="text-lg dark:text-white">
          Email
        </label>
        <input
          autoComplete="yes"
          type="email"
          id="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() =>
            setEmailError(email.trim() === "" ? "Email must not be empty" : "")
          }
          className="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          ref={emailRef}
        />
        <span className="text-sm text-red-500">{emailError}</span>
      </div>

      <div className="flex flex-col pt-4">
        <label htmlFor="password" className="text-lg dark:text-white">
          Password
        </label>
        <input
          autoComplete="no"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() =>
            setPasswordError(
              password.trim() === "" ? "Password must not be empty" : ""
            )
          }
          className="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        <span className="text-sm text-red-500">{passwordError}</span>
      </div>

      <button
        type="submit"
        className={`p-2 mt-8 text-lg font-bold text-white rounded bg-[#015AB8] hover:bg-gray-700 ${
          !isFormValid && "opacity-50 cursor-not-allowed"
        }`}
        disabled={!isFormValid}
      >
        Login
      </button>
    </form>
  );
};

export default FormLogin;
