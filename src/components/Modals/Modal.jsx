import { IoCloseOutline } from "react-icons/io5";
import "./modal.css";

const Modal = ({ children, isOpenModal, setIsOpenModal }) => {
  

  if (!isOpenModal) return null;

  return (
    <div
      onClick={() => setIsOpenModal(false)}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[1px]  flex items-center justify-center p-4 "
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative animate-modal-in mx-auto max-h-full"
      >
        <button
          onClick={() => setIsOpenModal(false)}
          className="absolute right-5 top-5 w-9 h-9 border border-line rounded-full flex justify-center items-center hover:bg-primary-background btn z-50"
        >
          <IoCloseOutline size={18} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
