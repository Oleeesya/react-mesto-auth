import React from "react";
import registered from '../img/registered.svg'
import unregistered from '../img/registered-not.svg'

function InfoTooltip({ onClose, isOpen, title }) {

    const [status, setStatus] = React.useState(false);

    return (
        <div className={`popup popup_type_info-tooltip ${isOpen && 'popup_opened'}`}>
            <div className="popup__container-tooltip">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <img className="popup__tooltip-image" src={`${status ? `${registered}` : `${unregistered}`}`}
                />
                <p className="popup__paragraph-tooltip" type="text" name="title">
                    {`${status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}
                </p>
            </div>
        </div>
    )
}

export default InfoTooltip;