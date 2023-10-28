import { Link, useParams } from "react-router-dom";
import useGetById from "../hooks/useGetById";
import { useEffect } from "react";

const MapPage = () => {
  const { data, loading, error, getDataById } = useGetById("api/v1/activity");
  const { id } = useParams();

  useEffect(() => {
    getDataById(id);
  }, [id]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Link
        to="/activity"
        className="px-2 py-1 mx-auto text-white rounded-lg bg-primaryColor"
      >
        Back Activity
      </Link>
      <div
        className="mx-auto my-auto"
        dangerouslySetInnerHTML={{
          __html: data?.data.location_maps,
        }}
      />
    </div>
  );
};

export default MapPage;
