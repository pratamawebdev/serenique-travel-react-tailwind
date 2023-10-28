import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

const ActivityLayouts = () => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imgUrl2, setImgUrl2] = useState("");
  const [price, setPrice] = useState();
  const [price_discount, setPriceDiscount] = useState();
  const [rating, setRating] = useState();
  const [total_reviews, setTotalReviews] = useState();
  const [facilities, setFacilities] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [location_maps, setLocationMaps] = useState();
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const { data, loading, error } = useFetch("api/v1/activities");
  const {
    data: dataCategory,
    loading: loadingCategory,
    error: errorCategory,
  } = useFetch("api/v1/categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const { createItem: handleAddActivity } = useCreate("api/v1/create-activity");
  const { updateItem } = useUpdate("api/v1/update-activity");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    data?.data?.length > 0 ? data.data[0].category.id : ""
  );
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    imageUrls: [imgUrl, imgUrl2],
    price,
    price_discount,
    rating,
    total_reviews,
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
    dataId: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const { deleteItem: handleDeleteActivity } = useDelete(
    "api/v1/delete-activity"
  );
  const {
    data: dataDetail,
    loading: loadingDetail,
    error: errorDetail,
    getDataById,
  } = useGetById("api/v1/activity");
  const {
    data: dataByCategory,
    loading: loadingByCategory,
    error: errorByCategory,
    getDataById: getDataByCategoryId,
  } = useGetById("api/v1/activities-by-category");

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
      const activityData = {
        categoryId: categoryId,
        title: title,
        description: description,
        imageUrls: [imgUrl, imgUrl2],
        price: parseInt(price),
        price_discount: parseInt(price_discount),
        rating: parseInt(rating),
        total_reviews: parseInt(total_reviews),
        facilities: facilities,
        address: address,
        province: province,
        city: city,
        location_maps: location_maps,
      };

      const createdItem = await handleAddActivity(activityData);

      console.log("Add activity successful:", createdItem);
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
      await handleDeleteActivity(deleteItemId);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };
  const handleUpdate = async (e, id) => {
    e.preventDefault();
    // if (!id) {
    //   return;
    // }
    try {
      const updatedActivityData = {
        title: formData.title,
        categoryId: formData.categoryId,
        description: formData.description,
        imageUrls: formData?.imageUrls,
        price: formData.price,
        price_discount: formData.price_discount,
        rating: formData.rating,
        total_reviews: formData.total_reviews,
        facilities: formData.facilities,
        address: formData.address,
        province: formData.province,
        city: formData.city,
        location_maps: formData.location_maps,
      };
      const updatedItem = await updateItem(id, updatedActivityData);
      console.log("Update data activity successful:", updatedItem);
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
        categoryId: dataDetail.data.categoryId,
        title: dataDetail.data.title,
        description: dataDetail.data.description,
        imageUrls: dataDetail.data.imageUrls,
        price: dataDetail.data.price,
        price_discount: dataDetail.data.price_discount,
        rating: dataDetail.data.rating,
        total_reviews: dataDetail.data.total_reviews,
        facilities: dataDetail.data.facilities,
        address: dataDetail.data.address,
        province: dataDetail.data.province,
        city: dataDetail.data.city,
        location_maps: dataDetail.data.location_maps,
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

    if (selectedValue === "all") {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(selectedValue);
    }
  };

  const handleMaps = (id) => {
    navigate(`/map/${id}`);
  };

  return (
    <AdminLayouts>
      <p className="mb-6 text-3xl font-bold text-gray-700">Activities</p>
      {loading ? (
        <div className="absolute top-1/2 left-1/2">
          <Loader />
        </div>
      ) : (
        <TableLayouts
          title="Manage Activities"
          searchTerm={searchTerm}
          onSearch={handleSearch}
          showFilter={true}
          filter={
            <select id="selectData" onChange={handleCategorySelect}>
              <option value="category" disabled>
                Select Category
              </option>
              <option value="all">All Activities</option>
              {[...new Set(data.data.map((v) => v.category.id))].map(
                (categoryId, i) => (
                  <option key={i} value={categoryId}>
                    {
                      data.data.find((v) => v.category.id === categoryId)
                        .category.name
                    }
                  </option>
                )
              )}
            </select>
          }
          button={
            <Button
              classname="py-[4px] px-2 bg-green-500"
              onClick={() => setShowModalAdd(true)}
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
                      <button
                        className="py-[4px] px-2 bg-red-500 rounded"
                        onClick={() => handleMaps(dataId)}
                      >
                        Map
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
        classname="w-[80%] md:w-[50%]"
        isVisible={showModalAdd}
        onClose={() => setShowModalAdd(false)}
      >
        <h2 className="mb-4 text-lg font-semibold">Add Activity</h2>
        <Form
          onSubmit={handleSubmit}
          onChangeTitle={(event) => setTitle(event.target.value)}
          onChangePrice={(event) => setPrice(parseInt(event.target.value))}
          onChangeDesc={(event) => setDescription(event.target.value)}
          onChangeAddress={(event) => setAddress(event.target.value)}
          onChangeLocationMaps={(event) => setLocationMaps(event.target.value)}
          onChangeImgUrl={(event) => setImgUrl(event.target.value)}
          onChangeImgUrl2={(event) => setImgUrl2(event.target.value)}
          onChangePriceDiscount={(event) =>
            setPriceDiscount(parseInt(event.target.value))
          }
          onChangeFacilities={(event) => setFacilities(event.target.value)}
          onChangeProvince={(event) => setProvince(event.target.value)}
          onChangeCity={(event) => setCity(event.target.value)}
          onChangeRating={(event) => setRating(parseInt(event.target.value))}
          onChangeReviews={(event) =>
            setTotalReviews(parseInt(event.target.value))
          }
          onChangeCategoryId={(event) => setCategoryId(event.target.value)}
          showFormActivity={true}
          placeholderTitle="Input activity title ..."
          placeholderPrice="Input activity price ..."
          placeholderDesc="Input activity description ..."
          placeholderAddress="Input activity address ..."
          placeholderLocationMaps="Input activity location maps ..."
          placeholderImageUrl="Input first activity image url ..."
          placeholderImageUrl2="Input second activity image url ..."
          placeholderPriceDiscount="Input activity price discount ..."
          placeholderFacilities="Input activity facilities ..."
          placeholderProvince="Input activity province ..."
          placeholderCity="Input activity city ..."
          placeholderRating="Input activity rating ..."
          placeholderReviews="Input activity reviews ..."
          placeholderCategoryId="Input activity category id ..."
        />
      </Modal>
      <Modal
        classname="w-[80%] md:w-[50%]"
        isVisible={showModalEdit}
        onClose={() => setShowModalEdit(false)}
      >
        <h2 className="mb-4 text-lg font-semibold">Edit Activity</h2>

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
              setFormData({ ...formData, imgUrl: e.target.value })
            }
            onChangeImgUrl2={(e) =>
              setFormData({ ...formData, imgUrl2: e.target.value })
            }
            onChangePrice={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            onChangePriceDiscount={(e) =>
              setFormData({ ...formData, price_discount: e.target.value })
            }
            onChangeRating={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
            onChangeReviews={(e) =>
              setFormData({ ...formData, total_reviews: e.target.value })
            }
            onChangeFacilities={(e) =>
              setFormData({ ...formData, facilities: e.target.value })
            }
            onChangeAddress={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            onChangeProvince={(e) =>
              setFormData({ ...formData, province: e.target.value })
            }
            onChangeCity={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
            onChangeLocationMaps={(e) =>
              setFormData({ ...formData, location_maps: e.target.value })
            }
            onChangeCategoryId={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            showFormActivity={true}
            placeholderCategoryId="Input activity category id ..."
            placeholderTitle="Input activity title ..."
            placeholderPrice="Input activity price ..."
            placeholderDesc="Input activity description ..."
            placeholderAddress="Input activity address ..."
            placeholderLocationMaps="Input activity location maps ..."
            placeholderImageUrl="Input first activity image url ..."
            placeholderImageUrl2="Input second activity image url ..."
            placeholderPriceDiscount="Input activity price discount ..."
            placeholderFacilities="Input activity facilities ..."
            placeholderProvince="Input activity province ..."
            placeholderCity="Input activity city ..."
            placeholderRating="Input activity rating ..."
            placeholderReviews="Input activity reviews ..."
            valueDescription={formData?.description}
            valueTitle={formData?.title}
            valuePrice={formData?.price}
            valueAddress={formData?.address}
            valueLocationMaps={formData?.location_maps}
            valuePriceDiscount={formData?.price_discount}
            valueRating={formData?.rating}
            valueImageUrl={formData.imageUrls[0]}
            valueImageUrl2={formData?.imageUrls[1]}
            valueReviews={formData?.total_reviews}
            valueFacilities={formData?.facilities}
            valueProvince={formData?.province}
            valueCity={formData?.city}
            valueCategoryId={formData?.categoryId}
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
        classname="w-[80%] md:w-[60%]"
        isVisible={showModalDetails}
        onClose={() => setShowModalDetails(false)}
      >
        <Card
          showDetailsActivity={true}
          title={dataDetail?.data?.title}
          categoryName={dataDetail?.data?.category?.name}
          src={dataDetail?.data?.imageUrls[0]}
          src1={dataDetail?.data?.imageUrls[1]}
          price={dataDetail?.data?.price}
          priceDiscount={dataDetail?.data?.price_discount}
          rating={dataDetail?.data?.rating}
          totalReviews={dataDetail?.data.total_reviews}
          facilities={dataDetail?.data?.facilities}
          address={dataDetail?.data?.address}
          province={dataDetail?.data?.province}
          city={dataDetail?.data?.city}
          createdAt={dataDetail?.data?.createdAt}
          updatedAt={dataDetail?.data?.updatedAt}
        />
      </Modal>
    </AdminLayouts>
  );
};

export default ActivityLayouts;
