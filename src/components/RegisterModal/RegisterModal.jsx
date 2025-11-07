import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function RegisterModal({ onClose, isOpen, onRegisterModalSubmit }) {
  const [data, setData] = useState({
    email: "",
    password: "",
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
        email: "",
        password: "",
        name: "",
        avatar: "",
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterModalSubmit(data);
  };

  return (
    <ModalWithForm
      buttonText="Next"
      text="or Log in"
      title="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="loginEmail" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="loginEmail"
          placeholder="Email"
          required
          onChange={handleChange}
          value={data.email}
        />
      </label>
      <label htmlFor="loginPassword" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="loginPassword"
          placeholder="Password"
          required
          onChange={handleChange}
          value={data.password}
        />
      </label>
      <label htmlFor="userName" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="userName"
          placeholder="Name"
          required
          onChange={handleChange}
          value={data.name}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          required
          onChange={handleChange}
          value={data.avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
