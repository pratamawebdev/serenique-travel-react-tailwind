import useFetch from "../../../hooks/useFetch";

const PromoCard = () => {
  const { data, loading, error } = useFetch("api/v1/promos");

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
    <>
      {data.data.map((v, i) => (
        <div
          key={i}
          className="p-2 shadow-lg  min-w-[15rem] bg-white rounded-md h-60"
        >
          <div className="relative">
            <img src={v.imageUrl} alt="" className="object-cover w-full h-40" />
            <div className="absolute p-1 bg-white rounded top-1 left-1">
              {v.promo_code}
            </div>
          </div>
          <div className="mt-2 text-sm font-bold">{v.title}</div>
          <div className="flex items-center justify-between">
            <div className="fixed bottom-0 text-sm font-bold">
              ${v.promo_discount_price}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PromoCard;
