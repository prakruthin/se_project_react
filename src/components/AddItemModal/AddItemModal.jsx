import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit, isLoading }) {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, setValues, handleChange } = useForm(defaultValues);
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItemModalSubmit(values);
    setValues(defaultValues);
  }

  return (
    <ModalWithForm
      buttonText={isLoading ? "Saving..." : "Add garment"}
      title="New garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="weather"
            // checked={weather === "hot"}
            onChange={handleChange}
            value="hot"
          />
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="weather"
            onChange={handleChange}
            value="warm"
            // checked={weather === "warm"}
          />
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="weather"
            onChange={handleChange}
            value="cold"
            // checked={weather === "cold"}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
