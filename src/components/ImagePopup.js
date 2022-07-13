function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_image ${card && 'popup_opened'}`}>
            <div className="popup__container-image">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <img className="popup__image" src={`${card?.link}`} alt={`${card?.name}`} />
                <p className="popup__paragraph-image" type="text" name="title"> {`${card?.name}`} </p>
            </div>
        </div>
    )
}

export default ImagePopup;