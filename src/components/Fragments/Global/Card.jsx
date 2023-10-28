const Card = (props) => {
  const {
    src,
    alt,
    name,
    showName,
    createdAt,
    updatedAt,
    description,
    showDescription,
    terms_condition,
    showTerm,
    title,
    showTitle,
    promo_code,
    showPromoCode,
    promo_discount_price,
    showPromoDiscountPrice,
    showHr,
    showDetailsPromo,
    showDetailsActivity,
    minimum_claim_price,
    showDetailsBanner,
    bannerName,
    src1,
    alt1,
    categoryName,
    price,
    priceDiscount,
    rating,
    totalReviews,
    facilities,
    address,
    province,
    city,
    locationMaps,
  } = props;
  return (
    <div className="w-full text-sm rounded-md shadow-md ">
      {showDetailsBanner && (
        <>
          <div className="relative">
            <span className="absolute px-2 py-1 font-semibold bg-white top-2 left-2 rounded-xl">
              {bannerName}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <img
              src={src}
              alt={alt}
              className="object-cover w-full h-60 rounded-t-xl"
            />
            <div className="flex justify-between p-2">
              <p>
                <span className="font-semibold">Created At:</span> {createdAt}
              </p>
              <p>
                <span className="font-semibold">Updated At:</span> {updatedAt}
              </p>
            </div>
          </div>
        </>
      )}
      {showDetailsPromo && (
        <>
          <div className="relative">
            <span className="absolute px-2 py-1 font-semibold bg-white top-2 left-2 rounded-xl">
              {title}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <img
              src={src}
              alt={alt}
              className="object-cover w-full h-44 md:h-60 rounded-t-xl"
            />

            <div className="flex flex-col justify-between p-2">
              <p className="mb-2 text-justify">{description}</p>
              <p className="mb-2 text-justify">
                <span className="font-semibold">Terms Condition: </span>
                {terms_condition}
              </p>
              <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                <div>
                  <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {createdAt}
                  </p>
                  <p>
                    <span className="font-semibold">Updated At:</span>{" "}
                    {updatedAt}
                  </p>
                  <p>
                    <span className="font-semibold">Minimum Claim:</span>{" "}
                    {minimum_claim_price}
                  </p>
                </div>

                <div className="flex items-center justify-center px-2 py-1 bg-green-500 rounded-xl">
                  <span> {promo_code}</span>
                  <div className="items-center inline-block">
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
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </div>
                  <span>{promo_discount_price} </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showDetailsActivity && (
        <>
          <div className="flex gap-2">
            <div className="flex flex-col w-[50%]">
              <div className="relative">
                <span className="absolute px-2 py-1 font-semibold bg-white top-1 left-1 ">
                  {title}
                </span>
                <span className="absolute px-2 py-1 font-semibold bg-white top-1 right-1 ">
                  {categoryName}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <img
                  src={src}
                  alt={alt}
                  className="object-cover w-full h-44 md:h-60"
                />
                <img
                  src={src1}
                  alt={alt1}
                  className="object-cover w-full h-44 md:h-60 "
                />
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
              <p>
                <span className="font-semibold">Price: </span>
                {price}
              </p>
              <p>
                <span className="font-semibold">Price Discount: </span>
                {priceDiscount}
              </p>
              <p>
                <span className="font-semibold">Rating: </span>
                {rating}
              </p>
              <p>
                <span className="font-semibold">Total Reviews: </span>
                {totalReviews}
              </p>
              <p>
                <span className="font-semibold">Facilities: </span>
                {facilities}
              </p>
              <p>
                <span className="font-semibold">Address: </span>
                {address}
              </p>
              <p>
                <span className="font-semibold">Province: </span>
                {province}
              </p>
              <p>
                <span className="font-semibold">City: </span>
                {city}
              </p>
              <p>
                <span className="font-semibold">Created At: </span>
                {createdAt}
              </p>
              <p>
                <span className="font-semibold">Update At: </span>
                {updatedAt}
              </p>
              {locationMaps}
            </div>
          </div>
        </>
      )}
      {/* <div className="relative">
        {showTitle && (
          <span className="absolute px-2 py-1 font-semibold bg-white top-2 left-2 rounded-xl">
            {title}
          </span>
        )}
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-60 rounded-t-xl"
        />
        <div className="flex flex-col w-full gap-2 px-4 py-3">
          {showName && (
            <p className="block text-lg font-bold text-black capitalize truncate">
              {name}
            </p>
          )}
          {showDescription && <p className="text-justify">{description}</p>}
          {showHr && <hr className="border-[1.5px] border-green-500" />}
          {showTerm && (
            <div>
              <span className="font-semibold">Terms Condition:</span>{" "}
              {terms_condition}
            </div>
          )}
          <div className="flex justify-between">
            {showDetailsPromo && (
              <div className="flex flex-col gap-2">
                <p>
                  <span className="font-semibold">Created At:</span> {createdAt}
                </p>
                <p>
                  <span className="font-semibold">Updated At:</span> {updatedAt}
                </p>
                <p>
                  <span className="font-semibold">Minimum Price:</span>{" "}
                  {minimum_claim_price}
                </p>
              </div>
            )}
            <div className="flex flex-col items-start justify-center gap-2">
              {showPromoCode && (
                <span className="px-2 py-1 bg-green-500 rounded-xl">
                  {promo_code}
                </span>
              )}
              {showPromoDiscountPrice && (
                <p>
                  <span>Discount Price: </span>
                  {promo_discount_price}
                </p>
              )}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Card;
