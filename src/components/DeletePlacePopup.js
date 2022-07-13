import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onCardDelete(props.id);
    }

    return (
        <PopupWithForm name="remove-card" title="Вы уверены?" isOpen={props.isOpen} onClose={props.onClose}
            onSubmit={handleSubmit} buttonText="Да" styleContainerRemove="popup__container-remove"
            stylePopupRemove="popup__content_name_remove"></PopupWithForm>
    )
}

export default DeletePlacePopup;