import "./ItemModal.css";
import closeWhite from "../../assets/closeWhite.svg";
// import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

function ItemModal({ activeModal, card, onClose, onItemDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img src={closeWhite} alt="Close" className="modal__close-icon" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            type="button"
            className="modal__delete-btn"
            onClick={() => {
              card?._id && onItemDelete(card._id);
            }}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
