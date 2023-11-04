const Card = (props) => {
  const {
    src,
    alt,
    createdAt,
    updatedAt,
    description,
    terms_condition,
    title,
    promo_code,
    promo_discount_price,
    showDetailsPromo,
    minimum_claim_price,
    showDetailsBanner,
    bannerName,
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
                    <span className="font-semibold">Minimum Claim:</span> ${" "}
                    {minimum_claim_price.toLocaleString("id-ID", {
                      styles: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>

                <div className="flex items-center justify-center px-2 py-1 bg-green-500 rounded-xl">
                  <span className="uppercase "> {promo_code}</span>
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
                  <span>
                    {" "}
                    ${" "}
                    {promo_discount_price.toLocaleString("id-ID", {
                      styles: "currency",
                      currency: "USD",
                    })}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
