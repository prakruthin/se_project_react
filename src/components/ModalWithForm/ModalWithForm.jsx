import "./ModalWithForm.css";
import closeDark from "../../assets/closeDark.svg";

function ModalWithForm({
  children,
  buttonText,
  text,
  title,
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img src={closeDark} alt="Close" className="modal__close-icon" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          <div className="modal__form-container">{children}</div>
          <div className="modal__button-container">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {text && <span className="modal__text">{text}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
