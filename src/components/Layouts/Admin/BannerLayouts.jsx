import { useState } from "react";
import Button from "../../Elements/Button/Index";
import Table from "../../Fragments/Admin/Table";
import Pagination from "../../Fragments/Global/Pagination";
import AdminLayouts from "../Wrapper/AdminLayouts";
import TableLayouts from "../Wrapper/TableLayouts";
import useDelete from "../../../hooks/useDelete";
import useCreate from "../../../hooks/usePost";
import useFetch from "../../../hooks/useFetch";
import useGetById from "../../../hooks/useGetById";
import useUpdate from "../../../hooks/useUpdate";
import Modal from "../../Fragments/Global/Modal";
import Card from "../../Fragments/Global/Card";
import Form from "../../Fragments/Admin/Form";
import Loader from "../../Fragments/Global/Loader";
import ConfirmMessage from "../../Fragments/Global/ConfirmMessage";
import Alert from "../../Fragments/Global/Alert";
import { apiCall } from "../../../utils/api";
import axios from "axios";
import useLocalStorage from "../../../hooks/useLocalStorage";

const BannerLayouts = () => {
  const [name, setName] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [profilePictureName, setProfilePictureName] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { createItem: handleAddBanner } = useCreate("api/v1/create-banner");
  const { data, loading, error, reFetch } = useFetch("api/v1/banners");
  const { updateItem } = useUpdate("api/v1/update-banner");
  const { deleteItem: handleDeleteBanner } = useDelete("api/v1/delete-banner");
  const {
    data: dataDetail,
    loading: loadingDetail,
    error: errorDetail,
    getDataById,
  } = useGetById("api/v1/banner");

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteItemId, setDeleteItemId] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [token, setToken] = useLocalStorage("authToken", "");
  const [loadingForm, setLoadingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    dataId: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState("");

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const totalPages = Math.ceil(data?.data?.length / itemsPerPage);

  const paginatedData = data?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      const bannerData = {
        name,
        imageUrl: urlFoto,
      };

      const createdItem = await handleAddBanner(bannerData);
      reFetch();
      setShowModalAdd(false);
      setAlert({
        show: true,
        message: createdItem.message,
        headerMessage: "Success!",
        style: "text-green-700 bg-green-200 border-green-400 w-96",
      });

      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 3000);
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
      console.error("Error during create:", error);
    }
  };

  const handleDelete = async (id) => {
    setDeleteItemId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const deletedItem = await handleDeleteBanner(deleteItemId);
      setShowDeleteConfirmation(false);
      reFetch();
      setAlert({
        show: true,
        message: deletedItem.message,
        headerMessage: "Success!",
        style: "text-green-700 bg-green-200 border-green-400 w-96",
      });

      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 3000);
    } catch (error) {
      setAlert({
        show: false,
        message: error?.message,
        headerMessage: "Failed!",
        style: "text-red-700 bg-red-100 border-red-400 w-96",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 3000);
      console.error("Error during delete:", error);
    }
  };

  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    if (!id) {
      return;
    }

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
      const updatedBannerData = {
        name: formData?.name,
        imageUrl: urlFoto,
      };
      const updatedItem = await updateItem(id, updatedBannerData);
      reFetch();
      setShowModalEdit(false);
      setAlert({
        show: true,
        message: updatedItem?.message,
        headerMessage: "Success!",
        style: "text-green-700 bg-green-200 border-green-400 w-96",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 3000);
      console.log("Update data banner successful:", updatedItem);
    } catch (error) {
      setAlert({
        show: false,
        message: error?.message,
        headerMessage: "Failed!",
        style: "text-red-700 bg-red-100 border-red-400 w-96",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 3000);
      console.error("Error during update:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewData = async (id) => {
    setLoadingForm(true);
    setShowModalEdit(true);
    try {
      const response = await apiCall(
        "get",
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${id}`
      );
      if (response.status === "OK") {
        setFormData({
          name: response.data.name,
          imageUrl: response.data.imageUrl,
          dataId: id,
        });
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoadingForm(false);
    }
  };

  const handleViewDetail = async (id) => {
    setShowModalDetails(true);
    await getDataById(id);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const filteredData = paginatedData?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openImagePreview = () => {
    if (profilePictureFile) {
      const imageUrl = URL.createObjectURL(profilePictureFile);
      setPreviewImageUrl(imageUrl);
      setShowPreview(true);
    }
  };

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
      <p className="mb-6 text-3xl font-bold text-gray-700">Banners</p>
      {error && <p>Error: {error.message}</p>}
      {loading ? (
        <div className="absolute top-1/2 left-[43%] md:left-1/2">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <TableLayouts
          title="Manage Banners"
          searchTerm={searchTerm}
          onSearch={handleSearch}
          button={
            <Button
              classname="py-[4px] px-2 bg-green-500"
              onClick={() => setShowModalAdd(true)}
            >
              Add Banner
            </Button>
          }
        >
          {filteredData?.length > 0 ? (
            <Table
              column={[
                { title: "Name", column: "name" },
                { title: "Created At", column: "createdAt" },
                { title: "Updated At", column: "updatedAt" },
                {
                  title: "Actions",
                  column: "actions",
                  useTemplate: true,
                  Template: ({ keyIndex, dataId }) => (
                    <td
                      key={keyIndex}
                      className="flex gap-2 px-4 py-2 border-b border-b-gray-50"
                    >
                      <button
                        className="py-[4px] px-2 bg-blue-400 rounded"
                        onClick={() => handleViewDetail(dataId)}
                      >
                        Detail
                      </button>
                      <button
                        className="py-[4px] px-2 bg-orange-400 rounded"
                        onClick={() => handleViewData(dataId)}
                      >
                        Edit
                      </button>
                      <button
                        className="py-[4px] px-2 bg-red-500 rounded"
                        onClick={() => handleDelete(dataId)}
                      >
                        Delete
                      </button>
                    </td>
                  ),
                },
              ]}
              data={(filteredData || []).map((v) => ({
                ...v,
                createdAt: formatDate(v.createdAt),
                updatedAt: formatDate(v.updatedAt),
                name: v.name.split(" ").slice(0, 2).join(" "),
              }))}
            />
          ) : (
            <p className="text-center">No data available</p>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </TableLayouts>
      )}
      <Modal
        classname="w-[80%] md:w-[40%]"
        isVisible={showModalAdd}
        onClose={() => {
          setShowModalAdd(false);
          setProfilePictureFile(null);
        }}
      >
        <h2 className="mb-4 text-lg font-semibold">Add Banner</h2>
        <Form
          onSubmit={handleSubmit}
          onChangeName={(event) => setName(event.target.value)}
          onChangePicture={(e) => {
            setProfilePictureName(e.target.value);
            setProfilePictureFile(e.target.files[0]);
          }}
          placeholderName="Input banner name ..."
          onClick={openImagePreview}
          showImagePreview={true}
        />
      </Modal>
      <Modal
        classname="w-[80%] md:w-[40%]"
        isVisible={showModalEdit}
        onClose={() => setShowModalEdit(false)}
      >
        <h2 className="mb-4 text-lg font-semibold">Edit Banner</h2>

        {loadingForm ? (
          <Loader classname="w-12 h-12" />
        ) : (
          <Form
            onSubmit={handleUpdate}
            showFormCategory={true}
            onChangeName={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            onChangePicture={(e) => {
              setProfilePictureName(e.target.value);
              setProfilePictureFile(e.target.files[0]);
            }}
            placeholderName="Input banner name ..."
            valueName={formData?.name}
            valueImageUrl={formData?.imageUrl}
            dataId={formData?.dataId}
            showImage={true}
          />
        )}
      </Modal>
      <Modal
        classname="w-[80%] md:w-[40%]"
        isVisible={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
      >
        <ConfirmMessage
          onConfirm={handleConfirmDelete}
          title="Confirm Delete"
          content="Are you sure you want to delete this item?"
          confirmText="Delete"
          onClose={() => setShowDeleteConfirmation(false)}
        />
      </Modal>
      <Modal
        classname="w-[80%] md:w-[40%]"
        isVisible={showModalDetails}
        onClose={() => setShowModalDetails(false)}
      >
        {loadingDetail ? (
          <Loader classname="w-12 h-12" />
        ) : (
          <Card
            src={dataDetail?.data?.imageUrl}
            bannerName={dataDetail?.data?.name}
            alt={dataDetail?.data?.name}
            showDetailsBanner={true}
            createdAt={formatDate(dataDetail?.data?.createdAt)}
            updatedAt={formatDate(dataDetail?.data?.updatedAt)}
          />
        )}
      </Modal>
      <Modal
        classname="items-center rounded-full w-96 h-96"
        isVisible={showPreview}
        onClose={() => setShowPreview(false)}
      >
        <img
          src={previewImageUrl}
          alt="Pratinjau Gambar"
          className="object-cover rounded-full w-[95%] h-[95%]"
        />
      </Modal>
    </AdminLayouts>
  );
};

export default BannerLayouts;
