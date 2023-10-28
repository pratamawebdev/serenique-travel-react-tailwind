import { Link } from "react-router-dom";
import { footerContentList1, footerContentList2 } from "../../../utils/data";

const FooterLayouts = () => {
  return (
    <footer className="pt-24 pb-8 bg-white footer dark:bg-gray-900">
      <div className="container grid gap-24 footer__container 2xl:mx-auto 2xl:max-w-5xl">
        <div className="footer__group grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] items-start gap-12 lg:flex lg:justify-between lg:justify-items-center">
          <div className="footer__content">
            <h2 className="footer__content-title font-serif text-[20px] font-semibold text-black dark:text-white">
              <Link to="/" className="footer__content-logo">
                Wisata Mystique.
              </Link>
            </h2>
          </div>

          <div className="footer__content">
            <h3 className="footer__content-title pb-4 font-serif text-[18px] font-semibold text-black dark:text-white">
              Learn More
            </h3>

            <ul className="flex flex-col gap-2 footer__content-list">
              {footerContentList1.map((v, i) => (
                <li key={i}>
                  <Link
                    to={v.url}
                    className="footer__content-link text-[15px] text-black dark:text-white hover:text-blue-600 hover:underline"
                  >
                    {v.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__content">
            <h3 className="footer__content-title pb-4 font-serif text-[18px] font-semibold text-black dark:text-white">
              Ticket & Booking
            </h3>

            <ul className="flex flex-col gap-2 footer__content-list">
              {footerContentList2.map((v, i) => (
                <li key={i}>
                  <Link
                    to={v.url}
                    className="footer__content-link text-[15px] text-black dark:text-white hover:text-blue-600 hover:underline"
                  >
                    {v.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__content">
            <h3 className="footer__content-title pb-4 font-serif text-[18px] font-semibold text-black dark:text-white">
              Socials
            </h3>

            <ul className="flex items-center gap-4 footer__content-socials w-max">
              <li>
                <Link
                  to="/"
                  className="footer__content-icon inline-flex text-[1.3rem] text-black dark:text-white hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="footer__content-icon inline-flex text-[1.3rem] text-white hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-youtube"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.4 2H1.6A1.6 1.6 0 0 0 0 3.6v8.8A1.6 1.6 0 0 0 1.6 14h12.8A1.6 1.6 0 0 0 16 12.4V3.6A1.6 1.6 0 0 0 14.4 2zM6.4 9.5V5.9l4.8 1.8-4.8 1.8z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className=" inline-flex text-[1.3rem] text-white hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 3.647c-.59.26-1.22.437-1.882.517.678-.406 1.198-1.048 1.44-1.814-.632.374-1.331.646-2.073.794-.596-.634-1.448-1.03-2.396-1.03-1.814 0-3.287 1.473-3.287 3.287 0 .26.022.513.08.756-2.734-.138-5.15-1.445-6.773-3.438-.283.49-.445 1.058-.445 1.663 0 1.145.582 2.15 1.46 2.742-.538-.017-1.043-.165-1.485-.41v.04c0 1.597 1.13 2.922 2.63 3.222-.276.075-.566.115-.864.115-.211 0-.416-.02-.62-.058.416 1.3 1.62 2.24 3.051 2.265-1.113.874-2.514 1.39-4.04 1.39-.262 0-.522-.015-.78-.045 1.437.92 3.14 1.458 4.97 1.458 5.963 0 9.24-4.94 9.24-9.24 0-.14 0-.28-.008-.42.634-.457 1.188-1.03 1.622-1.678z" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="footer__copy border-t-2 border-black dark:border-white pt-8 text-center text-[15px]text-black dark:text-white">
          Copyrights 2023
        </p>
      </div>
    </footer>
  );
};

export default FooterLayouts;
