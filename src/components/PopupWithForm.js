function PopupWithForm(props) {

    return (
        <div className={`${props.title !== "Вход" && props.title !== "Регистрация" && `popup popup_type_${props.name} popup_background ${props.isOpen && 'popup_opened'}`}`}>
            <div className={`${props.styleContainerRemove ? props.styleContainerRemove : props.title == "Вход" || props.title == "Регистрация" ? 'account' : 'popup__container'}`}>
                {props.title !== "Вход" && props.title !== "Регистрация" && <button className="popup__close-button" type="button" onClick={props.onClose}></button>}
                <form className={`${props.stylePopupRemove ? props.stylePopupRemove + 'popup__content popup__content_name_edit' : 'popup__content popup__content_name_edit'}`}
                    name={props.name} onSubmit={props.onSubmit}>
                    <h2 className={`${props.title == "Вход" || props.title == "Регистрация" ? 'account__welcome' : 'popup__heading'}`}>{props.title}</h2>
                    {props.children}
                    <button type="submit" className={`${props.title == "Вход" || props.title == "Регистрация" ? 'account__button-container popup__submit' : 'popup__submit'}`}>{props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;