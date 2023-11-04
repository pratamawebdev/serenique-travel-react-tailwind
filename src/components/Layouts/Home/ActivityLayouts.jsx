import { Link } from "react-router-dom";
import ActivityGallery from "../../Fragments/Home/ActivityGallery";

const ActivityLayouts = () => {
  return (
    <section className="transition-all destinations section duration-400 dark:bg-gray-900">
      <div className="container grid gap-12 destinations__container">
        <div className="text-center destinations__data">
          <p className="destinations__subtitle section-subtitle">
            Best Activities
          </p>
          <h1 className="destinations__title section-title">
            Explore Interesting Activities in Our Destinations
          </h1>
        </div>

        <div className="grid justify-center destinations__group lg:max-w-5xl xs:max-w-sm xs:mx-auto sm:max-w-md md:max-w-lg xs:grid-cols-1 xl:max-w-5xl ">
          <ActivityGallery />
          <Link
            to="/activities"
            className="px-5 py-2 mx-auto text-white rounded-lg bg-primaryColor w-[15%] flex items-center justify-center "
          >
            More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActivityLayouts;
