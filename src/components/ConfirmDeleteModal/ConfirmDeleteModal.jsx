import "./ConfirmDeleteModal.css";
import closeDark from "../../assets/closeDark.svg";

function ConfirmDeleteModal({ isOpen, onClose, onConfirmDelete }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_confirm-delete">
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img src={closeDark} alt="Close" className="modal__close-icon" />
        </button>
        <p className="modal__title modal__title_type_confirm-delete">
          Are you sure you want to delete this item?{" "}
          <span>This action is irreversible.</span>
        </p>
        <div className="modal__buttons">
          <button
            className="modal__button modal__button_type_confirm-delete-btn"
            type="button"
            onClick={onConfirmDelete}
          >
            Yes, delete item
          </button>
          <button
            className="modal__button modal__button_type_cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
