import Button from "../../Elements/Button/Index";

const ConfirmMessage = ({
  onConfirm,
  confirmText,
  onClose,
  title,
  content,
}) => {
  return (
    <>
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <p>{content}</p>
      <div className="flex justify-end mt-4">
        <Button classname="mr-2" onClick={onClose}>
          Cancel
        </Button>
        <Button classname="px-2 py-1 bg-red-500" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </>
  );
};

export default ConfirmMessage;
