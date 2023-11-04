import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Button from "../../Elements/Button/Index";
import Table from "../../Fragments/Admin/Table";
import AdminLayouts from "../Wrapper/AdminLayouts";
import TableLayouts from "../Wrapper/TableLayouts";
import useGetById from "../../../hooks/useGetById";
import Pagination from "../../Fragments/Global/Pagination";
import Modal from "../../Fragments/Global/Modal";
import Form from "../../Fragments/Admin/Form";
import useCreate from "../../../hooks/usePost";
import useUpdate from "../../../hooks/useUpdate";
import useDelete from "../../../hooks/useDelete";
import ConfirmMessage from "../../Fragments/Global/ConfirmMessage";
import Card from "../../Fragments/Global/Card";
import Loader from "../../Fragments/Global/Loader";
import { apiCall } from "../../../utils/api";
import Alert from "../../Fragments/Global/Alert";
import useLocalStorage from "../../../hooks/useLocalStorage";
import axios from "axios";

const CategoryLayouts = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const itemsPerPage = 5;
  const { data, loading, error, reFetch } = useFetch("api/v1/categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const { createItem } = useCreate("api/v1/create-category");
  const { updateItem } = useUpdate("api/v1/update-category");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [token, setToken] = useLocalStorage("authToken", "");
  const [profilePictureName, setProfilePictureName] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    dataId: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "" });
  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const { deleteItem } = useDelete("api/v1/delete-category");
  const {
    data: dataDetail,
    loading: loadingDetail,
    error: errorDetail,
    getDataById,
  } = useGetById("api/v1/category");

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (!data || data?.data?.length === 0) {
    return <p>No data available.</p>;
  }

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

      const createdItem = await createItem(bannerData);
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
      const deletedItem = await deleteItem(deleteItemId);
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
      const updatedCategoryData = {
        name: formData?.name,
        imageUrl: urlFoto,
      };
      const updatedItem = await updateItem(id, updatedCategoryData);
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
      console.log("Update data category successful:", updatedItem);
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
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${id}`
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

  const handleViewDetail = (id) => {
    setShowModalDetails(true);
    getDataById(id);
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
      <p className="mb-6 text-3xl font-bold text-gray-700">Categories</p>
      {loading ? (
        <div className="absolute top-1/2 left-1/2">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <TableLayouts
          title="Manage Categories"
          searchTerm={searchTerm}
          onSearch={handleSearch}
          button={
            <Button
              classname="py-[4px] px-2 bg-green-500"
              onClick={() => setShowModalAdd(true)}
            >
              Add Category
            </Button>
          }
        >
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
            }))}
          />

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
        onClose={() => setShowModalAdd(false)}
      >
        <h2 className="mb-4 text-lg font-semibold">Add Category</h2>
        <Form
          onSubmit={handleSubmit}
          onChangeName={(event) => setName(event.target.value)}
          onChangeImgUrl={(event) => setImageUrl(event.target.value)}
          placeholderName="Input category name ..."
          placeholderImageUrl="Input category image url ..."
        />
      </Modal>
      <Modal
        classname="w-[80%] md:w-[40%]"
        isVisible={showModalEdit}
        onClose={() => setShowModalEdit(false)}
      >
        <h2 className="mb-4 text-lg font-semibold">Edit Category</h2>

        {loadingForm ? (
          <Loader classname="w-12 h-12" />
        ) : (
          <Form
            onSubmit={handleUpdate}
            onChangeName={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            onChangePicture={(e) => {
              setProfilePictureName(e.target.value);
              setProfilePictureFile(e.target.files[0]);
            }}
            showFormCategory={true}
            placeholderName="Input category name ..."
            placeholderImageUrl="Input category image url ..."
            valueName={formData.name}
            valueImageUrl={formData.imageUrl}
            dataId={formData.dataId}
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
    </AdminLayouts>
  );
};

export default CategoryLayouts;
