import { useState, useEffect, useContext } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({
  onClose,
  isOpen,
  onEditProfileModalSubmit,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [data, setData] = useState({
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isOpen) {
      setData({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfileModalSubmit(data);
  };

  return (
    <ModalWithForm
      buttonText={isLoading ? "Saving..." : "Save changes"}
      title="Change profile data"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="editName" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="editName"
          placeholder="Name"
          required
          onChange={handleChange}
          value={data.name}
        />
      </label>
      <label htmlFor="editAvatar" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="editAvatar"
          placeholder="Avatar url"
          required
          onChange={handleChange}
          value={data.avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
