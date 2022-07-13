import React from "react";
import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onAddPlace, onClose }) {

  const [name, setName] = useState('');
  const [path, setPath] = useState('');

  useEffect(() => {
    setName("");
    setPath("");
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setPath(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    onAddPlace({
      link: path,
      name: name
    });
  }

  return (

    <PopupWithForm name="create" title="Новое место" isOpen={isOpen} onClose={onClose}
      buttonText="Создать" onSubmit={handleAddPlaceSubmit}>
      <label className="popup__label">
        <input className="popup__input popup__input_edit_header" id="title-input" type="text" name="name"
          required maxLength="40" minLength="2" placeholder="Название" value={name || ''} onChange={handleChangeName} />
        <span className="popup__input-error title-input-error"></span>
      </label>
      <label className="popup__label">
        <input className="popup__input popup__input_edit_paragraph" id="subtitle-input" type="text" name="about"
          required maxLength="200" minLength="2" placeholder="Ссылка на картинку" value={path || ''} onChange={handleChangeLink} />
        <span className="popup__input-error subtitle-input-error"></span>
      </label>
    </PopupWithForm>

  )
}

export default AddPlacePopup;