import { useState, useEffect } from "react";
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

const CategoryLayouts = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const itemsPerPage = 5;
  const { data, loading, error } = useFetch("api/v1/categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const { createItem: handleAddCategory } = useCreate("api/v1/create-category");
  const { updateItem } = useUpdate("api/v1/update-category");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    dataId: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const { deleteItem: handleDeleteCategory } = useDelete(
    "api/v1/delete-category"
  );
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
      const categoryData = {
        name,
        imageUrl,
      };

      const createdItem = await handleAddCategory(categoryData);

      console.log("Add category successful:", createdItem);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleDelete = async (id) => {
    setDeleteItemId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDeleteCategory(deleteItemId);
      // After successful deletion, close the confirmation modal
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
      const updatedCategoryData = {
        name: formData.name,
        imageUrl: formData.imageUrl,
      };
      const updatedItem = await updateItem(id, updatedCategoryData);
      console.log("Update data category successful:", updatedItem);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewData = async (id) => {
    setShowModalEdit(true);
    await getDataById(id);
    if (dataDetail) {
      setFormData({
        name: dataDetail.data.name,
        imageUrl: dataDetail.data.imageUrl,
        dataId: id,
      });
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
      <p className="mb-6 text-3xl font-bold text-gray-700">Categories</p>
      {loading ? (
        <div className="absolute top-1/2 left-1/2">
          <Loader />
        </div>
      ) : (
        <TableLayouts
          title="Manage Categories"
          searchTerm={searchTerm} // Mengirim nilai pencarian sebagai prop
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
          showFormCategory={true}
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

        {loadingDetail ? (
          <Loader />
        ) : (
          <Form
            onSubmit={handleUpdate}
            onChangeName={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            onChangeImgUrl={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
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
        <Card
          src={dataDetail?.data?.imageUrl}
          bannerName={dataDetail?.data?.name}
          alt={dataDetail?.data?.name}
          showDetailsBanner={true}
          createdAt={formatDate(dataDetail?.data?.createdAt)}
          updatedAt={formatDate(dataDetail?.data?.updatedAt)}
        />
      </Modal>
    </AdminLayouts>
  );
};

export default CategoryLayouts;
