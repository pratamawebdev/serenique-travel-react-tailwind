import { Link, useNavigate, useParams } from "react-router-dom";
import useGetById from "../../../hooks/useGetById";
import AdminLayouts from "../Wrapper/AdminLayouts";
import { useEffect, useState } from "react";
import useUpdate from "../../../hooks/useUpdate";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../Fragments/Global/Loader";
import { urlStaticImage } from "../../../utils/data";
import { apiCall } from "../../../utils/api";
import axios from "axios";
import useLocalStorage from "../../../hooks/useLocalStorage";
import Alert from "../../Fragments/Global/Alert";

const EditActivityLayouts = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [imgUrl2, setImgUrl2] = useState("");
  const [profilePictureName, setProfilePictureName] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState([]);
  const [token, setToken] = useLocalStorage("authToken", "");
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    imageUrls: [imgUrl, imgUrl2],
    price: 0,
    price_discount: 0,
    rating: 0,
    total_reviews: 0,
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
    dataId: null,
  });

  const { data, loading, error, getDataById } = useGetById("api/v1/activity");
  const { updateItem } = useUpdate("api/v1/update-activity");
  const { id } = useParams();
  const {
    data: dataCategory,
    loading: loadingCategory,
    error: errorCategory,
  } = useFetch("api/v1/categories");

  const navigate = useNavigate();

  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      let imageUrlList = [];
      const acceptImage = ["image/"];
      for (const item of profilePictureFile) {
        let isFileValid = false;
        for (const acceptedType of acceptImage) {
          if (item.type.startsWith(acceptedType)) {
            isFileValid = true;
            break;
          }
        }
        if (!isFileValid) {
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
        if (item?.size > 500 * 1024) {
          return setAlert({
            show: true,
            message: "Uploaded file exceeds 500 kb",
            headerMessage: "Failed!",
            style: "text-red-700 bg-red-100 border-red-400 w-96",
          });
        }
        setTimeout(() => {
          setAlert({ show: false, message: "" });
        }, 3000);
        let data = new FormData();
        data.append("image", item);
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
              imageUrlList.push(response.data.url);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      const updatedActivityData = {
        title: formData.title,
        categoryId: formData.categoryId,
        description: formData.description,
        imageUrls: imageUrlList,
        price: parseInt(formData.price),
        price_discount: parseInt(formData.price_discount),
        rating: parseFloat(formData.rating),
        total_reviews: parseInt(formData.total_reviews),
        facilities: formData.facilities,
        address: formData.address,
        province: formData.province,
        city: formData.city,
        location_maps: formData.location_maps,
      };
      const updatedItem = await updateItem(id, updatedActivityData);
      setAlert({
        show: true,
        message: updatedItem.message,
        headerMessage: "Success!",
        style: "text-green-700 bg-green-200 border-green-400 w-96",
      });
      const alertTimeout = setTimeout(() => {
        setAlert({ show: false, message: "" });
        navigate("/activity");
        console.log("Update data activity successful:", updatedItem);
      }, 2000);
      return () => clearTimeout(alertTimeout);
    } catch (error) {
      setAlert({
        show: true,
        message: error.message,
        headerMessage: "Failed!",
        style: "text-red-700 bg-red-100 border-red-400 w-96",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 3000);
      console.error("Error:", error);
    }
  };

  const handleViewData = async (id) => {
    const response = await apiCall(
      "get",
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`
    );
    if (response.status === "OK") {
      setFormData({
        categoryId: response.data.categoryId,
        title: response.data.title,
        description: response.data.description,
        imageUrls: response.data.imageUrls,
        price: response.data.price,
        price_discount: response.data.price_discount,
        rating: response.data.rating,
        total_reviews: response.data.total_reviews,
        facilities: response.data.facilities,
        address: response.data.address,
        province: response.data.province,
        city: response.data.city,
        location_maps: response.data.location_maps,
        dataId: id,
      });
    }
  };

  useEffect(() => {
    handleViewData(id);
    getDataById(id);
  }, []);

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
        Edit Activity - {data?.data?.title}
      </p>
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <div className="p-6 mb-4 bg-white border border-gray-100 rounded-md shadow-md text-dark-900 dark:text-white dark:border-gray-700 dark:bg-gray-700 shadow-black/5 ">
          <form
            action=""
            className="flex flex-col gap-2"
            onSubmit={(e) => handleUpdate(e, id)}
          >
            <div className="flex items-center gap-2">
              <div className="items-center w-full">
                <label htmlFor="category">Category:</label>
                <select
                  name="category"
                  id="category"
                  value={formData?.categoryId}
                  className="w-full p-2 mt-1 border rounded text-darkColor"
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                >
                  {dataCategory?.data?.map((v, i) => (
                    <option key={i} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  className="w-full p-2 mt-1 border rounded text-darkColor"
                  placeholder="Sawadikap Forest"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  className="w-full p-2 mt-1 border rounded text-darkColor"
                  placeholder="100000"
                  value={formData?.price || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="price_discount">Price Discount:</label>
                <input
                  type="number"
                  id="price_discount"
                  placeholder="10000"
                  className="w-full p-2 mt-1 border rounded text-darkColor"
                  value={formData?.price_discount || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, price_discount: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full">
                <label htmlFor="rating">Rating:</label>
                <div className="w-full">
                  <input
                    type="number"
                    id="rating"
                    className="w-full p-2 mt-1 border rounded text-darkColor"
                    placeholder="4"
                    value={formData?.rating || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="total_reviews">Total Reviews:</label>
                <div className="w-full">
                  <input
                    type="number"
                    id="total_reviews"
                    className="w-full p-2 mt-1 border rounded text-darkColor"
                    placeholder="4000"
                    value={formData?.total_reviews || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        total_reviews: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-full">
                <label htmlFor="facilities">Facilities:</label>
                <textarea
                  id="facilities"
                  className="w-full p-2 border rounded text-darkColor"
                  placeholder="<p>Wheel chair</p>"
                  value={formData?.facilities || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, facilities: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  className="w-full p-2 border rounded text-darkColor"
                  placeholder="Explore the wonders of under the sea in the middle of busy Jakarta at the Sea World Ancol! As the name suggests, you can experience the beauty of life underwater with an enticing visit to this aquarium."
                  value={formData?.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full">
                <label htmlFor="province">Province:</label>
                <input
                  type="text"
                  id="province"
                  className="w-full p-2 border rounded text-darkColor"
                  placeholder="Central Sulawesi"
                  value={formData?.province || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, province: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  className="w-full p-2 border rounded text-darkColor"
                  placeholder="Palu"
                  value={formData?.city || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full">
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  className="w-full p-2 border rounded text-darkColor"
                  placeholder="Taman Impian Jaya Ancol. Jl. Lodan timur No.7, RW.10, Ancol, Kec. Pademangan, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14430, Indonesia"
                  value={formData?.address || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="location_maps">Location Maps:</label>
                <textarea
                  id="location_maps"
                  className="w-full p-2 border rounded text-darkColor"
                  placeholder="<iframe src='https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3967.0362349768025!2d106.8428182!3d-6.125826300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMDcnMzMuMCJTIDEwNsKwNTAnMzQuMiJF!5e0!3m2!1sen!2sid!4v1679931691632!5m2!1sen!2sid' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>"
                  value={formData?.location_maps || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, location_maps: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex justify-center w-full gap-4 px-1 h-72">
                <img
                  src={formData?.imageUrls[0] || urlStaticImage}
                  alt=""
                  className="object-cover w-[50%] border "
                />
                <img
                  src={formData?.imageUrls[1] || urlStaticImage}
                  alt=""
                  className="object-cover w-[50%] border"
                />
              </div>
              <div className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setProfilePictureName(e.target.value);
                    setProfilePictureFile(e.target.files);
                    console.log(e.target.files);
                  }}
                  className="text-darkColor dark:text-white"
                  multiple
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
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
      <Link
        to="/activity"
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

export default EditActivityLayouts;
