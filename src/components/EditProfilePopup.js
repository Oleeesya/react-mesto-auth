import React from "react";
import PopupWithForm from "./PopupWithForm";
import { currentUserContext } from '../contexts/CurrentUserContext';
import { useEffect } from "react";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const userContext = React.useContext(currentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  useEffect(() => {
    setName(userContext.name);
    setDescription(userContext.about);
  }, [userContext, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isOpen} onClose={onClose}
      buttonText="Сохранить" onSubmit={handleSubmit}>
      <label className="popup__label">
        <input className="popup__input popup__input_edit_header" id="title-input" type="text" name="name"
          required maxLength="40" minLength="2" placeholder="Имя" value={name || ''} onChange={handleChangeName} />
        <span className="popup__input-error title-input-error"></span>
      </label>
      <label className="popup__label">
        <input className="popup__input popup__input_edit_paragraph" id="subtitle-input" type="text" name="about"
          required maxLength="200" minLength="2" placeholder="Занятие" value={description || ''} onChange={handleChangeDescription} />
        <span className="popup__input-error subtitle-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;