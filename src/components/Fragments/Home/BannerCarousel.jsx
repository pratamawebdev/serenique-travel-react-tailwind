import { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

const BannerCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, loading, error } = useFetch("api/v1/banners");

  useEffect(() => {
    if (data) {
      // Limit the number of slides to the first 5 from the API response
      setSlides(data?.data?.slice(0, 5)); // Assuming your API response is an array of slide objects
    }
  }, [data]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleAutoSlide = () => {
    nextSlide();
  };

  useEffect(() => {
    const interval = setInterval(handleAutoSlide, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!slides || slides.length === 0) {
    return <div>No data available</div>;
  }

  const currentSlide = slides[currentIndex];

  if (!currentSlide || !currentSlide.imageUrl) {
    return <div>No image available for the current slide</div>;
  }
  console.log(slides[currentIndex].imageUrl);
  return (
    <div className="relative w-full h-screen group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].imageUrl})` }}
        className="w-full h-full duration-500 bg-center bg-cover"
      >
        <div className="absolute text-4xl font-bold text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {slides[currentIndex]?.name}
        </div>
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
          onClick={prevSlide}
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
          onClick={nextSlide}
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="absolute flex justify-center gap-2 py-2 bottom-2 right-1/2 left-1/2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-circle"
              style={{ color: slideIndex === currentIndex ? "015AB8" : "gray" }}
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
