import { useState, useEffect } from "react";
import Button from "../../Elements/Button/Index";
import Table from "../../Fragments/Admin/Table";
import Pagination from "../../Fragments/Global/Pagination";
import AdminLayouts from "../Wrapper/AdminLayouts";
import TableLayouts from "../Wrapper/TableLayouts";
import useDelete from "../../../hooks/useDelete";
import useFetch from "../../../hooks/useFetch";
import Modal from "../../Fragments/Global/Modal";
import Loader from "../../Fragments/Global/Loader";
import ConfirmMessage from "../../Fragments/Global/ConfirmMessage";
import { useNavigate } from "react-router-dom";

const ActivityLayouts = () => {
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [urlGetActivities, setUrlGetActivities] = useState("api/v1/activities");
  const { data, loading, error, reFetch } = useFetch(urlGetActivities);
  const {
    data: dataCategory,
    loading: loadingCategory,
    error: errorCategory,
  } = useFetch("api/v1/categories");
  console.log(dataCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    data?.data?.length > 0 ? data.data[0].category.id : ""
  );

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const { deleteItem: handleDeleteActivity } = useDelete(
    "api/v1/delete-activity"
  );

  const totalPages = Math.ceil(data?.data?.length / itemsPerPage);

  const paginatedData = data?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    setDeleteItemId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDeleteActivity(deleteItemId);
      reFetch();
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const filteredDataByCategory = selectedCategoryId
    ? paginatedData?.filter((item) => item.categoryId === selectedCategoryId)
    : paginatedData;

  const filteredDataWithSearch = filteredDataByCategory?.filter((item) => {
    const itemData = Object?.values(item);
    for (const data of itemData) {
      if (
        typeof data === "string" &&
        data?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });

  const handleCategorySelect = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    if (selectedValue === "all") {
      setUrlGetActivities("api/v1/activities");
    } else {
      setUrlGetActivities(`api/v1/activities-by-category/${selectedValue}`);
    }
  };

  useEffect(() => {
    reFetch();
  }, [urlGetActivities]);

  const handleViewDetail = (id) => {
    navigate(`/detailActivity/${id}`);
  };

  const handleEditData = (id) => {
    navigate(`/editActivity/${id}`);
  };

  const handleAddData = () => {
    navigate("/addActivity");
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <AdminLayouts>
      <p className="mb-6 text-3xl font-bold text-darkColor dark:text-white">
        Activities
      </p>
      {loading ? (
        <div className="absolute top-1/2 left-1/2">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <TableLayouts
          title="Manage Activities"
          searchTerm={searchTerm}
          onSearch={handleSearch}
          showFilter={true}
          filter={
            <select
              id="selectData"
              onChange={handleCategorySelect}
              className="bg-white text-darkColor dark:text-white dark:bg-gray-700"
            >
              <option value="category" disabled>
                Select Category
              </option>
              <option value="all">All Activities</option>
              {(dataCategory?.data || []).map((v, i) => (
                <option key={i} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          }
          button={
            <Button
              classname="py-[4px] px-2 bg-green-500"
              onClick={handleAddData}
            >
              Add Activity
            </Button>
          }
        >
          {filteredDataWithSearch?.length > 0 ? (
            <Table
              column={[
                { title: "Title", column: "title" },
                { title: "Category", column: "category" },
                { title: "Created At", column: "createdAt" },
                { title: "Updated At", column: "updatedAt" },
                {
                  title: "Actions",
                  column: "actions",
                  useTemplate: true,
                  Template: ({ keyIndex, dataId }) => (
                    <td
                      key={keyIndex}
                      className="flex gap-2 px-4 py-2 border-b "
                    >
                      <button
                        className="py-[4px] px-2 bg-blue-400 rounded"
                        onClick={() => handleViewDetail(dataId)}
                      >
                        Detail
                      </button>
                      <button
                        className="py-[4px] px-2 bg-orange-400 rounded"
                        onClick={() => handleEditData(dataId)}
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
              data={(filteredDataWithSearch || []).map((v) => ({
                ...v,
                createdAt: formatDate(v.createdAt),
                updatedAt: formatDate(v.updatedAt),
                category: v.category.name,
                title: v.title.split(" ").slice(0, 2).join(" "),
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
    </AdminLayouts>
  );
};

export default ActivityLayouts;
