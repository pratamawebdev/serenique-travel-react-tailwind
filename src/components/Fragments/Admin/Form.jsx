const Form = (props) => {
  const {
    dataId,
    onSubmit,
    key,
    showFormActivity,
    showFormCategory,
    showFormPromo,
    placeholderCategoryId,
    placeholderName,
    placeholderTitle,
    placeholderDesc,
    placeholderImageUrl,
    placeholderImageUrl2,
    placeholderPrice,
    placeholderPriceDiscount,
    placeholderRating,
    placeholderReviews,
    placeholderFacilities,
    placeholderAddress,
    placeholderProvince,
    placeholderCity,
    placeholderLocationMaps,
    placeholderMinimumClaimPrice,
    placeholderTermsCondition,
    placeholderPromoCode,
    placeholderPromoDiscountPrice,
    onChangeImgUrl2,
    onChangePrice,
    onChangePriceDiscount,
    onChangeRating,
    onChangeReviews,
    onChangeFacilities,
    onChangeAddress,
    onChangeProvince,
    onChangeCity,
    onChangeLocationMaps,
    onChangeName,
    onChangeTitle,
    onChangeDesc,
    onChangeImgUrl,
    onChangeMinimumClaimPrice,
    onChangeTermsCondition,
    onChangePromoCode,
    onChangePromoDiscountPrice,
    onChangeCategoryId,
    valueImageUrl2,
    valuePrice,
    valuePriceDiscount,
    valueRating,
    valueReviews,
    valueFacilities,
    valueAddress,
    valueProvince,
    valueCity,
    valueLocationMaps,
    valueName,
    valueTitle,
    valueDescription,
    valueImageUrl,
    valueTermsCondition,
    valuePromoCode,
    valuePromoDiscountPrice,
    valueMinimumClaimPrice,
    valueCategoryId,
  } = props;

  return (
    <form onSubmit={(e) => onSubmit(e, dataId)} key={key}>
      {showFormPromo && (
        <>
          <div className="mb-4">
            <input
              type="text"
              id="title"
              className="w-full p-2 mt-1 border rounded"
              placeholder={placeholderTitle}
              value={valueTitle}
              onChange={onChangeTitle}
            />
          </div>
          <div className="mb-4">
            <textarea
              id="description"
              className="w-full p-2 mt-1 border rounded"
              placeholder={placeholderDesc}
              value={valueDescription}
              onChange={onChangeDesc}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="imageUrl"
              className="w-full p-2 mt-1 border rounded"
              placeholder={placeholderImageUrl}
              value={valueImageUrl}
              onChange={onChangeImgUrl}
            />
          </div>
          <div className="mb-4">
            <textarea
              id="terms_condition"
              className="w-full p-2 mt-1 border rounded"
              placeholder={placeholderTermsCondition}
              value={valueTermsCondition}
              onChange={onChangeTermsCondition}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="promo_code"
              className="w-full p-2 mt-1 border rounded"
              placeholder={placeholderPromoCode}
              value={valuePromoCode}
              onChange={onChangePromoCode}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              id="promo_discount_price"
              className="w-full p-2 mt-1 border rounded"
              placeholder={placeholderPromoDiscountPrice}
              value={valuePromoDiscountPrice}
              onChange={onChangePromoDiscountPrice}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              id="minimum_claim_price"
              className="w-full p-2 mt-1 border rounded"
              placeholder={placeholderMinimumClaimPrice}
              value={valueMinimumClaimPrice}
              onChange={onChangeMinimumClaimPrice}
            />
          </div>
        </>
      )}
      {showFormCategory && (
        <>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              className="w-full p-2 mt-1 border rounded"
              placeholder={placeholderName}
              value={valueName}
              onChange={onChangeName}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="imageUrl"
              className="w-full p-2 mt-1 border rounded"
              placeholder={placeholderImageUrl}
              value={valueImageUrl}
              onChange={onChangeImgUrl}
            />
          </div>
        </>
      )}
      {showFormActivity && (
        <>
          <div className="flex items-center justify-center gap-3">
            <div className="mb-4">
              <input
                type="text"
                id="category_id"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderCategoryId}
                value={valueCategoryId}
                onChange={onChangeCategoryId}
              />
            </div>
            <div className="w-full mb-4">
              <input
                type="text"
                id="title"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderTitle}
                value={valueTitle}
                onChange={onChangeTitle}
              />
            </div>
            <div className="w-full mb-4">
              <input
                type="number"
                id="price"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderPrice}
                value={valuePrice}
                onChange={onChangePrice}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-full mb-4">
              <textarea
                id="description"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderDesc}
                value={valueDescription}
                onChange={onChangeDesc}
              />
            </div>
            <div className="w-full mb-4">
              <textarea
                id="address"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderAddress}
                value={valueAddress}
                onChange={onChangeAddress}
              />
            </div>
            <div className="w-full mb-4">
              <textarea
                id="LocationMaps"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderLocationMaps}
                value={valueLocationMaps}
                onChange={onChangeLocationMaps}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="mb-4">
              <input
                type="text"
                id="imageUrl"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderImageUrl}
                value={valueImageUrl}
                onChange={onChangeImgUrl}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="imageUrl2"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderImageUrl2}
                value={valueImageUrl2}
                onChange={onChangeImgUrl2}
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                id="price_discount"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderPriceDiscount}
                value={valuePriceDiscount}
                onChange={onChangePriceDiscount}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="mb-4">
              <input
                type="text"
                id="facilities"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderFacilities}
                value={valueFacilities}
                onChange={onChangeFacilities}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="province"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderProvince}
                value={valueProvince}
                onChange={onChangeProvince}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="city"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderCity}
                value={valueCity}
                onChange={onChangeCity}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-full mb-4">
              <input
                type="number"
                id="rating"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderRating}
                value={valueRating}
                onChange={onChangeRating}
              />
            </div>
            <div className="w-full mb-4">
              <input
                type="number"
                id="reviews"
                className="w-full p-2 mt-1 border rounded"
                placeholder={placeholderReviews}
                value={valueReviews}
                onChange={onChangeReviews}
              />
            </div>
          </div>
        </>
      )}
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
