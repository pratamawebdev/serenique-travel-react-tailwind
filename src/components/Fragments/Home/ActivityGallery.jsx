import useFetch from "../../../hooks/useFetch";

const ActivityGallery = () => {
  const { data, loading, error } = useFetch("api/v1/activities");
  console.log(data);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (!data || data.data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div className="grid grid-rows-none gap-2 py-4 md:grid-cols-5 md:gap-4">
      {data.data.slice(0, 1).map((v, i) => (
        <img
          key={i}
          className="object-cover object-center w-full h-full col-span-2 row-span-2 md:col-span-3 "
          src={v.imageUrls}
          alt={`Activity ${v.name}`}
        />
      ))}
      {data.data.slice(2).map((v, i) => (
        <img
          key={i}
          className="object-cover w-full h-full"
          src={v.imageUrls}
          alt={`Activity ${v.name}`}
        />
      ))}
    </div>
  );
};

export default ActivityGallery;
