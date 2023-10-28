import useFetch from "../../../hooks/useFetch";
import { dataStatic } from "../../../utils/data";
import Loader from "../Global/Loader";

const CategoryCard = () => {
  const { data, loading, error } = useFetch("api/v1/categories");

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || data.data.length === 0) {
    return (
      <>
        {dataStatic.map((v, i) => (
          <div
            key={i}
            className="bg-white shadow-md duration-50 rounded-xl hover:scale-105 hover:shadow-xl"
          >
            <a href="#">
              <img
                src={v.imageUrl}
                alt="Product"
                className="object-cover w-full h-44 rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <p className="block text-lg font-bold text-black capitalize truncate">
                  {v.name}
                </p>
              </div>
            </a>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {data.data.slice(0, 6).map((v, i) => (
        <div
          key={i}
          className="bg-white shadow-md duration-50 rounded-xl hover:scale-105 hover:shadow-xl"
        >
          <a href="#">
            <img
              src={v.imageUrl}
              alt="Product"
              className="object-cover w-full h-44 rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <p className="block text-lg font-bold text-black capitalize truncate">
                {v.name}
              </p>
            </div>
          </a>
        </div>
      ))}
    </>
  );
};

export default CategoryCard;
