import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import useColorMode from "../../../hooks/useColorMode";

import ProfileDropdown from "../Global/ProfileDropdown";
import { navItems } from "../../../utils/data";
import useLocalStorage from "../../../hooks/useLocalStorage";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useLocalStorage("authToken", "");
  const [stickyNav, setstickyNav] = useState(false);
  const location = useLocation();

  const isCurrentPage = (url) => {
    // Fungsi ini akan memeriksa apakah URL cocok dengan lokasi saat ini
    return location.pathname === url;
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        setstickyNav(true);
      } else {
        setstickyNav(false);
      }
    });
  }, [stickyNav]);

  const [colorMode, setColorMode] = useColorMode();
  return (
    <nav
      className={`navbar fixed top-0 left-0 z-50 w-full transition-all duration-400 lg:backdrop-blur-xl lg:backdrop-filter ${
        stickyNav
          ? "bg-white shadow-md dark:bg-darkColor"
          : "bg-transparent shadow-none"
      }`}
    >
      <div className="container flex items-center justify-between h-24 navbar__container ">
        <Link to="/" className="text-5xl navbar__logo text-primaryColor">
          Wisata Mystique
        </Link>
        <Link
          to="/"
          className={`navbar__logo text-5xl text-primaryColor ${
            stickyNav ? "text-darkColor" : "text-darkColor"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="hidden w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </Link>

        <div
          className={`navbar__menu fixed top-0 z-10 flex h-full w-[50%] flex-col justify-between bg-white px-8 pt-24 pb-10 shadow-[0_-4px_12px_rgba(0,0,0,0.12)] transition-all duration-400 dark:bg-darkColor lg:static lg:z-auto lg:h-auto lg:w-auto lg:flex-row lg:items-center lg:gap-8 lg:bg-transparent lg:p-0 lg:shadow-none lg:dark:bg-transparent ${
            menuOpen ? "right-0" : "-right-full"
          }`}
        >
          <ul className="flex flex-col gap-8 mb-8 navbar__list lg:mb-0 lg:flex-row">
            {navItems.map(({ title, url }) => (
              <li key={url}>
                <Link
                  to={url}
                  className={`navbar__link group relative text-[15px] font-medium leading-tight text-darkColor dark:text-white ${
                    isCurrentPage(url) ? "active" : ""
                  } ${
                    stickyNav
                      ? "lg:text-darkColor lg:dark:text-white"
                      : "lg:text-darkColor"
                  }`}
                >
                  {title}
                  <div
                    className={`absolute top-6 left-0 h-[3px] w-0 bg-primaryColor transition-all duration-400 group-hover:w-full ${
                      stickyNav ? "lg:bg-primaryColor" : "lg:bg-white"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="hidden cursor-pointer p-1 text-[1.3rem] dark:text-white lg:flex text-darkColor"
            onClick={() =>
              setColorMode(colorMode === "light" ? "dark" : "light")
            }
          >
            {colorMode === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            )}
          </div>

          {!token && (
            <Link to="/register" className="text-white header__button button">
              Register
            </Link>
          )}

          <div className="mx-auto">
            {token && (
              <ProfileDropdown classname="-right-24 bottom-12 lg:right-0 lg:bottom-auto" />
            )}
          </div>
        </div>

        <div className="inline-flex items-center gap-5 header__wrapper lg:hidden">
          <div
            className={`header__theme cursor-pointer p-1 text-[1.3rem] dark:text-white ${
              stickyNav ? "text-darkColor" : "text-white"
            }`}
            onClick={() =>
              setColorMode(colorMode === "light" ? "dark" : "light")
            }
          >
            {colorMode === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            )}
          </div>

          <div
            className="header__toggle z-10 inline-flex cursor-pointer p-1 text-[1.3rem]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {!menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`dark:text-white w-5 h-5 ${
                  stickyNav ? "text-darkColor" : "text-white"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-darkColor dark:text-white"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
