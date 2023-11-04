import { Link, useParams } from "react-router-dom";
import useGetById from "../../../hooks/useGetById";
import AdminLayouts from "../Wrapper/AdminLayouts";
import { useEffect } from "react";
import Loader from "../../Fragments/Global/Loader";
import { urlStaticImage } from "../../../utils/data";

const DetailActivityLayouts = () => {
  const { data, loading, error, getDataById } = useGetById("api/v1/activity");
  const { id } = useParams();
  const dataDetail = data?.data;

  useEffect(() => {
    getDataById(id);
  }, []);

  const facilitiesData = dataDetail?.facilities;
  const regexForFacilities = /<p>(.*?)<\/p>/;

  const matchForFacilities = facilitiesData?.match(regexForFacilities);
  const facility = matchForFacilities && matchForFacilities[1];

  const facilityElement = facility ? (
    <p>{facility}</p>
  ) : (
    <p>{facilitiesData}</p>
  );

  const mapsData = dataDetail?.location_maps;
  const regexForMaps = /<iframe.*?src=['"](.*?)['"].*?>/;

  const matchForMaps = mapsData?.match(regexForMaps);
  const map = matchForMaps && matchForMaps[1];

  const RenderMap = () => {
    return (
      <iframe
        src={
          map ||
          "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d127659.30149251157!2d119.87517440000002!3d-0.8749056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1698632957781!5m2!1sid!2sid"
        }
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full rounded-md h-96"
      ></iframe>
    );
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <AdminLayouts classname="pb-8">
      <p className="mb-6 text-3xl font-bold text-darkColor dark:text-white">
        Detail Activity - {dataDetail?.title}
      </p>
      {loading ? (
        <div className="absolute top-1/2 left-1/2">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <div className="p-6 mb-4 bg-white border border-gray-100 rounded-md shadow-md text-dark-900 dark:text-white dark:border-gray-700 dark:bg-gray-700 shadow-black/5 ">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 md:justify-center lg:flex-row h-96">
              <img
                src={dataDetail?.imageUrls[0]}
                alt={dataDetail?.title}
                loading="lazy"
                className="object-cover w-full lg:max-w-[50%] h-[50%] lg:h-full rounded-md"
              />
              <img
                src={urlStaticImage}
                alt={dataDetail?.title}
                loading="lazy"
                className="object-cover w-full lg:max-w-[50%] h-[50%] lg:h-full rounded-md"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">{dataDetail?.title}</h1>
              <div className="flex items-center justify-between sm:gap-2">
                <div className="flex justify-start gap-2">
                  <span className="bg-[#ECF8FF] px-2 py-1 rounded-xl text-[#0264C8]">
                    {dataDetail?.category?.name}
                  </span>
                  <span className="flex items-center justify-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="yellow"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                    {dataDetail?.rating}({dataDetail?.total_reviews})
                  </span>
                </div>
              </div>
              <div>
                <span className="font-semibold">Price: </span>
                {dataDetail?.price}
              </div>
              <div>
                <span className="font-semibold">Price Discount: </span>
                {dataDetail?.price_discount}
              </div>
              <div className="text-justify ">
                <p className="font-semibold">Facilities:</p> {facilityElement}
              </div>
              <div className="text-justify">
                <p className="font-semibold">Description:</p>{" "}
                {dataDetail?.description}
              </div>
              <div className="flex flex-col justify-between lg:flex-row">
                <p>
                  <span className="font-semibold">Created At:</span>{" "}
                  {formatDate(dataDetail?.createdAt)}
                </p>
                <p>
                  <span className="font-semibold">Update At:</span>{" "}
                  {formatDate(dataDetail?.updatedAt)}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="mb-2 font-semibold">Location Info:</p>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-full max-w-[24px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <span className="text-justify">
                    {dataDetail?.address}, {dataDetail?.city},{" "}
                    {dataDetail?.province}
                  </span>
                </div>
              </div>
            </div>
            <RenderMap />
          </div>
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

export default DetailActivityLayouts;
