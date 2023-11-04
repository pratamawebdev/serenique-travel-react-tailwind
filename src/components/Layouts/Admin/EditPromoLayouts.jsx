import { useEffect, useState } from "react";
import AdminLayouts from "../Wrapper/AdminLayouts";
import useUpdate from "../../../hooks/useUpdate";
import { useNavigate, useParams } from "react-router-dom";
import { apiCall } from "../../../utils/api";
import axios from "axios";
import useLocalStorage from "../../../hooks/useLocalStorage";
import Loader from "../../Fragments/Global/Loader";
import Alert from "../../Fragments/Global/Alert";

const EditPromoLayouts = () => {
  const { id } = useParams();
  const [profilePictureName, setProfilePictureName] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useLocalStorage("authToken", "");
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: 0,
    minimum_claim_price: 0,
    dataId: null,
  });
  const { updateItem } = useUpdate("api/v1/update-promo");
  const navigate = useNavigate();
  const handleViewData = async (id) => {
    setLoading(true);

    try {
      const response = await apiCall(
        "get",
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`
      );
      if (response.status === "OK") {
        setFormData({
          title: response.data.title,
          description: response.data.description,
          imageUrl: response.data.imageUrl,
          terms_condition: response.data.terms_condition,
          promo_code: response.data.promo_code,
          promo_discount_price: response.data.promo_discount_price,
          minimum_claim_price: response.data.minimum_claim_price,
          dataId: id,
        });
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    // if (!id) {
    //   return;
    // }
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
      const updatedPromoData = {
        title: formData.title,
        description: formData.description,
        terms_condition: formData.terms_condition,
        promo_code: formData.promo_code,
        promo_discount_price: parseInt(formData.promo_discount_price),
        minimum_claim_price: parseInt(formData.minimum_claim_price),
        imageUrl: urlFoto,
      };
      const updatedItem = await updateItem(id, updatedPromoData);
      setAlert({
        show: true,
        message: updatedItem.message,
        headerMessage: "Success!",
        style: "text-green-700 bg-green-200 border-green-400 w-96",
      });
      const alertTimeout = setTimeout(() => {
        setAlert({ show: false, message: "" });
        navigate("/promo");
        console.log("Update data promo successful:", updatedItem);
      }, 2000);
      return () => clearTimeout(alertTimeout);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleViewData(id);
  }, []);
  return (
    <AdminLayouts>
      {alert?.show && (
        <Alert
          headerMessage={alert.headerMessage}
          message={alert.message}
          classname={`fixed right-10 ${alert.style} top-20`}
          onClose={handleAlertClose}
        />
      )}
      <p className="mb-6 text-3xl font-bold text-darkColor dark:text-white">
        Edit Promo
      </p>
      {loading ? (
        <div className="absolute top-1/2 left-[43%] md:left-[47%]">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <div className="p-6 mb-4 bg-white border border-gray-100 rounded-md shadow-md text-dark-900 dark:text-white dark:border-gray-700 dark:bg-gray-700 shadow-black/5 ">
          <form action="" onSubmit={(e) => handleUpdate(e, id)}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="w-full">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    className="w-full p-2 mt-1 border rounded"
                    placeholder="Staycation Brings Silaturahmi 🙏"
                    value={formData?.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="promo_code">Promo Code:</label>
                  <input
                    type="text"
                    id="promo_code"
                    className="w-full p-2 mt-1 border rounded"
                    placeholder="BELI2"
                    value={formData?.promo_code}
                    onChange={(e) =>
                      setFormData({ ...formData, promo_code: e.target.value })
                    }
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
                    className="w-full p-2 mt-1 border rounded"
                    placeholder="100000"
                    value={formData?.promo_discount_price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        promo_discount_price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="minimum_claim_price">Min Claim Price:</label>
                  <input
                    type="number"
                    id="minimum_claim_price"
                    className="w-full p-2 mt-1 border rounded"
                    placeholder="5000000"
                    value={formData?.minimum_claim_price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        minimum_claim_price: e.target.value,
                      })
                    }
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
                    className="w-full p-2 border rounded"
                    placeholder="Friendly reminder, family staycation shall be forever memorable ✨ Book staycation now with discount up to Rp1 mio for Hotels, Villas & Resorts to celebrate Ramadan moments with your loved ones to celebrate Ramadan and Lebaran moments"
                    value={formData?.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="terms_condition">Terms Condition:</label>
                  <textarea
                    name="terms_condition"
                    id="terms_condition"
                    cols="30"
                    rows="10"
                    className="w-full p-2 border rounded"
                    placeholder="<p>Discount coupon of 15% (maximum value of IDR 150,000) with a minimum transaction of IDR 50,000 in one booking code.</p>"
                    value={formData?.terms_condition}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        terms_condition: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex">
                <img
                  src={formData?.imageUrl}
                  alt="image promo"
                  className="object-cover w-full h-72 md:h-96"
                />
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
                    className="text-darkColor dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center my-2">
              <button
                type="submit"
                className="px-3 py-2 text-white rounded-md bg-primaryColor"
              >
                Update Data
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayouts>
  );
};

export default EditPromoLayouts;
