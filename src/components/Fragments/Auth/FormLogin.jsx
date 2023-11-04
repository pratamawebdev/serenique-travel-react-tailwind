import { useState, useRef, useEffect } from "react";
import useCreate from "../../../hooks/usePost"; // Ganti dengan path yang benar
import useLocalStorage from "../../../hooks/useLocalStorage";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useLocalStorage("authToken", "");
  const [role, setRole] = useLocalStorage("role", "");
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { createItem: handleLogin } = useCreate("api/v1/login");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = { email, password };
      const createdItem = await handleLogin(loginData);
      console.log("Login successful:", createdItem);
      setToken(createdItem.token || createdItem.data);
      setRole(createdItem.data.role);
      window.location.href = "/";
    } catch (error) {
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
