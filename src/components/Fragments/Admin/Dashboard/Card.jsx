const Card = (props) => {
  const { count, title, children } = props;
  const isError = count === 0;

  return (
    <div className="flex items-center h-40 p-8 bg-white rounded-lg shadow-lg">
      {children}
      <div>
        <span
          className={`block text-2xl font-bold ${
            isError ? "text-red-500" : "text-black"
          }`}
        >
          {isError ? "0" : count}
        </span>
        <span className="block text-gray-500">{title}</span>
      </div>
    </div>
  );
};

export default Card;
