import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Button from "../../Elements/Button/Index";
import Table from "../../Fragments/Admin/Table";
import AdminLayouts from "../Wrapper/AdminLayouts";
import TableLayouts from "../Wrapper/TableLayouts";
import useGetById from "../../../hooks/useGetById";
import Pagination from "../../Fragments/Global/Pagination";
import Modal from "../../Fragments/Global/Modal";
import useDelete from "../../../hooks/useDelete";
import ConfirmMessage from "../../Fragments/Global/ConfirmMessage";
import Card from "../../Fragments/Global/Card";
import Loader from "../../Fragments/Global/Loader";
import { useNavigate } from "react-router-dom";
import Alert from "../../Fragments/Global/Alert";

const PromoLayouts = () => {
  const itemsPerPage = 5;
  const { data, loading, error, reFetch } = useFetch("api/v1/promos");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };
  const [alert, setAlert] = useState({ show: false, message: "" });
  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };
  const { deleteItem } = useDelete("api/v1/delete-promo");
  const {
    data: dataDetail,
    loading: loadingDetail,
    error: errorDetail,
    getDataById,
  } = useGetById("api/v1/promo");

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
  console.log(paginatedData);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddData = () => {
    navigate("/addPromo");
  };

  const handleEditData = (id) => {
    navigate(`/editPromo/${id}`);
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
    item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <p className="mb-6 text-3xl font-bold text-gray-700">Promos</p>
      {loading ? (
        <div className="absolute top-1/2 left-1/2">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <TableLayouts
          title="Manage Promos"
          searchTerm={searchTerm}
          onSearch={handleSearch}
          button={
            <Button
              classname="py-[4px] px-2 bg-green-500"
              onClick={handleAddData}
            >
              Add Promo
            </Button>
          }
        >
          {filteredData?.length > 0 ? (
            <Table
              column={[
                { title: "Title", column: "title" },
                { title: "Promo Code", column: "promo_code" },
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
              data={(filteredData || []).map((v) => ({
                ...v,
                createdAt: formatDate(v.createdAt),
                updatedAt: formatDate(v.updatedAt),
                title: v.title.split(" ")[0],
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
      <Modal
        classname="w-[90%] md:w-[50%]"
        isVisible={showModalDetails}
        onClose={() => setShowModalDetails(false)}
      >
        {loadingDetail ? (
          <Loader />
        ) : (
          <Card
            showDetailsPromo={true}
            title={dataDetail?.data?.title}
            src={dataDetail?.data?.imageUrl}
            alt={dataDetail?.data?.title}
            description={dataDetail?.data?.description}
            terms_condition={dataDetail?.data?.terms_condition}
            createdAt={dataDetail?.data?.createdAt}
            updatedAt={dataDetail?.data?.updatedAt}
            promo_code={dataDetail?.data?.promo_code}
            promo_discount_price={dataDetail?.data?.promo_discount_price}
            minimum_claim_price={dataDetail?.data?.minimum_claim_price}
          />
        )}
      </Modal>
    </AdminLayouts>
  );
};

export default PromoLayouts;
