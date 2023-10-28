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

const PromoLayouts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [minimum_claim_price, setMinimumClaimPrice] = useState("");
  const [terms_condition, setTermsCondition] = useState("");
  const [promo_code, setPromoCode] = useState("");
  const [promo_discount_price, setPromoDiscountPrice] = useState("");
  const itemsPerPage = 5;
  const { data, loading, error } = useFetch("api/v1/promos");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const { createItem: handleAddPromo } = useCreate("api/v1/create-promo");
  const { updateItem } = useUpdate("api/v1/update-promo");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price,
    minimum_claim_price,
    dataId: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const { deleteItem: handleDeletePromo } = useDelete("api/v1/delete-promo");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const promoData = {
        title,
        description,
        imageUrl,
        terms_condition,
        promo_code,
        promo_discount_price: parseInt(promo_discount_price),
        minimum_claim_price: parseInt(minimum_claim_price),
      };

      const createdItem = await handleAddPromo(promoData);

      console.log("Add promo successful:", createdItem);
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
      await handleDeletePromo(deleteItemId);
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
      const updatedPromoData = {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        terms_condition: formData.terms_condition,
        promo_code: formData.promo_code,
        promo_discount_price: formData.promo_discount_price,
        minimum_claim_price: formData.minimum_claim_price,
      };
      const updatedItem = await updateItem(id, updatedPromoData);
      console.log("Update data promo successful:", updatedItem);
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
        title: dataDetail.data.title,
        description: dataDetail.data.description,
        imageUrl: dataDetail.data.imageUrl,
        terms_condition: dataDetail.data.terms_condition,
        promo_code: dataDetail.data.promo_code,
        promo_discount_price: dataDetail.data.promo_discount_price,
        minimum_claim_price: dataDetail.data.minimum_claim_price,
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
    item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayouts>
      <p className="mb-6 text-3xl font-bold text-gray-700">Promos</p>
      {loading ? (
        <div className="absolute top-1/2 left-1/2">
          <Loader />
        </div>
      ) : (
        <TableLayouts
          title="Manage Promos"
          searchTerm={searchTerm}
          onSearch={handleSearch}
          button={
            <Button
              classname="py-[4px] px-2 bg-green-500"
              onClick={() => setShowModalAdd(true)}
            >
              Add Promo
            </Button>
          }
        >
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
              title: v.title.split(" ")[0],
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
        <h2 className="mb-4 text-lg font-semibold">Add Promo</h2>
        <Form
          onSubmit={handleSubmit}
          showFormPromo={true}
          placeholderTitle="Input promo title ..."
          placeholderDesc="Input promo description ..."
          placeholderImageUrl="Input promo image url"
          placeholderMinimumClaimPrice="Input minimum claim price ..."
          placeholderTermsCondition="Input promo terms condition ... "
          placeholderPromoCode="Input promo code ..."
          placeholderPromoDiscountPrice="Input promo discount price"
          onChangeTitle={(event) => setTitle(event.target.value)}
          onChangeDesc={(event) => setDescription(event.target.value)}
          onChangeImgUrl={(event) => setImageUrl(event.target.value)}
          onChangeTermsCondition={(event) =>
            setTermsCondition(event.target.value)
          }
          onChangePromoCode={(event) => setPromoCode(event.target.value)}
          onChangePromoDiscountPrice={(event) =>
            setPromoDiscountPrice(parseInt(event.target.value))
          }
          onChangeMinimumClaimPrice={(event) =>
            setMinimumClaimPrice(parseInt(event.target.value))
          }
        />
      </Modal>
      <Modal
        classname="w-[80%] md:w-[40%]"
        isVisible={showModalEdit}
        onClose={() => setShowModalEdit(false)}
      >
        <h2 className="mb-4 text-lg font-semibold">Edit Promo</h2>

        {loadingDetail ? (
          <Loader />
        ) : (
          <Form
            onSubmit={handleUpdate}
            onChangeTitle={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            onChangeDesc={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            onChangeImgUrl={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            onChangeTermsCondition={(e) =>
              setFormData({ ...formData, terms_condition: e.target.value })
            }
            onChangePromoCode={(e) =>
              setFormData({ ...formData, promo_code: e.target.value })
            }
            onChangePromoDiscountPrice={(e) =>
              setFormData({ ...formData, promo_discount_price: e.target.value })
            }
            onChangeMinimumClaimPrice={(e) =>
              setFormData({ ...formData, minimum_claim_price: e.target.value })
            }
            placeholderTitle="Input promo title ..."
            placeholderDesc="Input promo description ..."
            placeholderImageUrl="Input promo image url"
            placeholderMinimumClaimPrice="Input minimum claim price ..."
            placeholderTermsCondition="Input promo terms condition ... "
            placeholderPromoCode="Input promo code ..."
            placeholderPromoDiscountPrice="Input promo discount price"
            showFormPromo={true}
            valueTitle={formData.title}
            valueDescription={formData.description}
            valueImageUrl={formData.imageUrl}
            valueTermsCondition={formData.terms_condition}
            valuePromoCode={formData.promo_code}
            valuePromoDiscountPrice={formData.promo_discount_price}
            valueMinimumClaimPrice={formData.minimum_claim_price}
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
        classname="w-[90%] md:w-[60%]"
        isVisible={showModalDetails}
        onClose={() => setShowModalDetails(false)}
      >
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
      </Modal>
    </AdminLayouts>
  );
};

export default PromoLayouts;
