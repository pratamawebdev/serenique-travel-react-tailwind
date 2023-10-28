const TableLayouts = (props) => {
  const { title, button, children, searchTerm, onSearch, showFilter, filter } =
    props;
  return (
    <div className="p-6 bg-white border border-gray-100 rounded-md shadow-md shadow-black/5 ">
      <div className="flex flex-col items-start gap-3 mb-4 sm:justify-between sm:flex-row md:flex-row ">
        <div className="flex items-center gap-8">
          <div className="font-medium">{title}</div>
          {showFilter && <div>{filter}</div>}
        </div>
        <div>{button}</div>
      </div>
      <form className="flex flex-col items-center gap-3 mb-4 sm:flex-row">
        <div className="flex w-full">
          <input
            type="text"
            className="flex w-full py-2 pl-4 text-sm border border-gray-100 rounded-md outline-none bg-gray-50 focus:border-blue-500"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </form>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
};

export default TableLayouts;
