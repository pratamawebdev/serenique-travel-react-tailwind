const Modal = ({ isVisible, onClose, children, classname }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      onClick={handleClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute top-[4%] right-[2%] bg-red-500 rounded-full cursor-pointer place-self-end h-7 w-7"
        onClick={() => onClose()}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      <div
        className={`p-2 flex flex-col justify-center bg-white rounded ${classname}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
