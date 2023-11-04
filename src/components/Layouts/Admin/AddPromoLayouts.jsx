import { useState } from "react";
import AdminLayouts from "../Wrapper/AdminLayouts";
import axios from "axios";
import useLocalStorage from "../../../hooks/useLocalStorage";
import Loader from "../../Fragments/Global/Loader";
import Alert from "../../Fragments/Global/Alert";
import useCreate from "../../../hooks/usePost";
import { Link } from "react-router-dom";

const AddPromoLayouts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [minimum_claim_price, setMinimumClaimPrice] = useState("");
  const [terms_condition, setTermsCondition] = useState("");
  const [promo_code, setPromoCode] = useState("");
  const [promo_discount_price, setPromoDiscountPrice] = useState("");
  const [profilePictureName, setProfilePictureName] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useLocalStorage("authToken", "");
  const [alert, setAlert] = useState({ show: false, message: "" });
  const { createItem } = useCreate("api/v1/create-promo");

  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      const promoData = {
        title,
        description,
        imageUrl: urlFoto,
        terms_condition,
        promo_code,
        promo_discount_price: parseInt(promo_discount_price),
        minimum_claim_price: parseInt(minimum_claim_price),
      };
      const createdItem = await createItem(promoData);
      console.log("Add promo successful:", createdItem);
    } catch (error) {
      console.error("Error during add:", error);
    }
  };

  return (
    <AdminLayouts classname="pb-8">
      {alert?.show && (
        <Alert
          headerMessage={alert.headerMessage}
          message={alert.message}
          classname={`fixed right-10 ${alert.style} top-20`}
          onClose={handleAlertClose}
        />
      )}
      <p className="mb-6 text-3xl font-bold text-darkColor dark:text-white">
        Add Promo
      </p>
      {loading ? (
        <div className="absolute top-1/2 left-[43%] md:left-[47%]">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <div className="p-6 mb-4 bg-white border border-gray-100 rounded-md shadow-md text-dark-900 dark:text-white dark:border-gray-700 dark:bg-gray-700 shadow-black/5 ">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="w-full">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    className="w-full p-2 mt-1 border rounded dark:text-darkColor"
                    placeholder="Staycation Brings Silaturahmi 🙏"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="promo_code">Promo Code:</label>
                  <input
                    type="text"
                    id="promo_code"
                    className="w-full p-2 mt-1 uppercase border rounded dark:text-darkColor"
                    placeholder="BELI2"
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="w-full">
                  <label htmlFor="promo_discount_price">
                    Promo Discount Price:
                  </label>
                  <input
                    type="number"
                    id="promo_discount_price"
                    className="w-full p-2 mt-1 border rounded dark:text-darkColor"
                    placeholder="100000"
                    onChange={(e) => setPromoDiscountPrice(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="minimum_claim_price">Min Claim Price:</label>
                  <input
                    type="number"
                    id="minimum_claim_price"
                    className="w-full p-2 mt-1 border rounded dark:text-darkColor"
                    placeholder="5000000"
                    onChange={(e) => setMinimumClaimPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="w-full">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    className="w-full p-2 border rounded dark:text-darkColor"
                    placeholder="Friendly reminder, family staycation shall be forever memorable ✨ Book staycation now with discount up to Rp1 mio for Hotels, Villas & Resorts to celebrate Ramadan moments with your loved ones to celebrate Ramadan and Lebaran moments"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="terms_condition">Terms Condition:</label>
                  <textarea
                    name="terms_condition"
                    id="terms_condition"
                    cols="30"
                    rows="10"
                    className="w-full p-2 border rounded dark:text-darkColor"
                    placeholder="<p>Discount coupon of 15% (maximum value of IDR 150,000) with a minimum transaction of IDR 50,000 in one booking code.</p>"
                    onChange={(e) => setTermsCondition(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="w-full">
                  <input
                    type="file"
                    value={profilePictureName}
                    accept="image/*"
                    onChange={(e) => {
                      setProfilePictureName(e.target.value);
                      setProfilePictureFile(e.target.files[0]);
                    }}
                    className="text-darkColordark:text-darkColor"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center my-2">
              <button
                type="submit"
                className="px-3 py-2 text-white rounded-md bg-primaryColor"
              >
                Add Data
              </button>
            </div>
          </form>
        </div>
      )}
      <Link
        to="/promo"
        className="inline-flex gap-1 px-2 py-1 bg-white border border-gray-100 rounded-md shadow-md text-darkColor dark:text-white dark:border-gray-700 dark:bg-gray-700 shadow-black/5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
        Back to activity
      </Link>
    </AdminLayouts>
  );
};

export default AddPromoLayouts;
