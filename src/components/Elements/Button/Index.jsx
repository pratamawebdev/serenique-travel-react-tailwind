const Button = (props) => {
  const { classname, type = "button", onClick, children } = props;
  return (
    <button
      className={`rounded-md cursor-pointer ${classname}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
