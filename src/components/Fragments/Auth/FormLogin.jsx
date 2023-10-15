const FormLogin = () => {
  return (
    <form className="flex flex-col pt-3 md:pt-8">
      <div className="flex flex-col pt-4">
        <label htmlFor="email" className="text-lg dark:text-white">
          Email
        </label>
        <input
          autoComplete="yes"
          type="email"
          id="email"
          placeholder="your@email.com"
          className="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
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
          className="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        type="submit"
        className="p-2 mt-8 text-lg font-bold text-white bg-[#015AB8] hover:bg-gray-700"
      >
        Login
      </button>
    </form>
  );
};

export default FormLogin;
