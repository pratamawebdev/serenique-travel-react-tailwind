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

const BannerLayouts = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const itemsPerPage = 5;
  const { data, loading, error } = useFetch("api/v1/banners");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const { createItem: handleAddBanner } = useCreate("api/v1/create-banner");
  const { updateItem } = useUpdate("api/v1/update-banner");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    dataId: null,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const { deleteItem: handleDeleteBanner } = useDelete("api/v1/delete-banner");
  const {
    data: dataDetail,
    loading: loadingDetail,
    error: errorDetail,
    getDataById,
  } = useGetById("api/v1/banner");

  const totalPages = Math.ceil(data?.data?.length / itemsPerPage);

  const paginatedData = data?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const bannerData = {
        name,
        imageUrl,
      };

      const createdItem = await handleAddBanner(bannerData);
      setShowModalAdd(false);
      setAlert({
        show: true,
        message: createdItem.message,
        headerMessage: "Success!",
        style: "text-green-700 bg-green-200 border-green-400",
      });

      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 3000);
    } catch (error) {
      setAlert({
        show: false,
        message: error.message,
        headerMessage: "Failed!",
        style: "text-red-700 bg-red-100 border-red-400",
      });
      console.error("Error during login:", error);
    }
  };

  const handleDelete = async (id) => {
    setDeleteItemId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDeleteBanner(deleteItemId);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    if (!id) {
      return;
    }

    try {
      const updatedBannerData = {
        name: formData.name,
        imageUrl: formData.imageUrl,
      };
      const updatedItem = await updateItem(id, updatedBannerData);
      console.log("Update data banner successful:", updatedItem);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewData = async (id) => {
    await getDataById(id);
    setShowModalEdit(true);
    if (dataDetail) {
      setFormData({
        name: dataDetail.data.name,
        imageUrl: dataDetail.data.imageUrl,
        dataId: id,
      });
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
  return (
    <AdminLayouts>
      {alert.show && (
        <Alert
          headerMessage={alert.headerMessage}
          message={alert.message}
          classname={`fixed w-[90%] left-[10%] ${alert.style} top-20`}
        />
      )}
      <p className="mb-6 text-3xl font-bold text-gray-700">Banners</p>
      {error && <p>Error: {error.message}</p>}
      {loading ? (
        <div className="absolute top-1/2 left-1/2">
          <Loader />
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
        onClose={() => setShowModalAdd(false)}
      >
        <h2 className="mb-4 text-lg font-semibold">Add Banner</h2>
        <Form
          onSubmit={handleSubmit}
          showFormCategory={true}
          onChangeName={(event) => setName(event.target.value)}
          onChangeImgUrl={(event) => setImageUrl(event.target.value)}
          placeholderName="Input banner name ..."
          placeholderImageUrl="Input banner image url ..."
        />
      </Modal>
      <Modal
        classname="w-[80%] md:w-[40%]"
        isVisible={showModalEdit}
        onClose={() => setShowModalEdit(false)}
      >
        <h2 className="mb-4 text-lg font-semibold">Edit Banner</h2>

        {loadingDetail ? (
          <Loader />
        ) : (
          <Form
            onSubmit={handleUpdate}
            showFormCategory={true}
            onChangeName={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            onChangeImgUrl={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            placeholderName="Input banner name ..."
            placeholderImageUrl="Input banner image url ..."
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
          <Loader />
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

export default BannerLayouts;
