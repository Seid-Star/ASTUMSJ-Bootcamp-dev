import { X } from "lucide-react";
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-gray-800">
        <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};
export default Modal;
