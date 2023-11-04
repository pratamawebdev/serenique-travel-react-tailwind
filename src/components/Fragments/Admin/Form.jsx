const Form = (props) => {
  const {
    dataId,
    onSubmit,
    key,
    placeholderName,
    onChangeName,
    valueName,
    valueImageUrl,
    onChangePicture,
    altImage,
    showImage,
    onClick,
    showImagePreview,
  } = props;

  return (
    <form onSubmit={(e) => onSubmit(e, dataId)} key={key}>
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
        {showImage && (
          <div className="mb-4">
            <img
              src={valueImageUrl}
              alt={altImage}
              className="object-cover w-full h-56 rounded"
            />
          </div>
        )}
        <div className="mb-4">
          <input
            type="file"
            onChange={onChangePicture}
            accept="image/*"
            className="text-darkColor"
          />
        </div>
        <div className="flex justify-between">
          {showImagePreview && (
            <button
              type="button"
              onClick={onClick}
              className="px-4 py-2 items-center flex justify-center text-md font-bold text-white bg-[#015AB8] hover:bg-gray-700 rounded"
            >
              Preview Image
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </>
    </form>
  );
};

export default Form;
