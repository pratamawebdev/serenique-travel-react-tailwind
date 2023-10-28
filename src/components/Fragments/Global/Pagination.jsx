const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="py-[4px] px-2 bg-blue-400 rounded"
      >
        Prev
      </button>

      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`py-[4px] px-2 w-7 bg-blue-400 rounded ${
              currentPage === index + 1 ? "bg-blue-600" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="py-[4px] px-2 bg-blue-400 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
