import React from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(currentUserContext);

    function handleClick() {
        props.onCardClick(props);
    }

    function handleLikeClick() {
        props.onCardLike(props.currentCard);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.currentCard);
    }

    const isOwn = currentUser._id === props.currentCard.owner._id;
    const cardDeleteDuttonClassName = (`${isOwn ? 'elements__trash' : 'elements__trash_hidden'}`);

    const isLiked = props.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`${isLiked ? 'elements__like elements__like_active' : 'elements__like'}`);

    return (
        <article className="elements__element">
            <button className={cardDeleteDuttonClassName} type="button" onClick={handleDeleteClick}></button>
            <img className="elements__image" src={props.link} onClick={handleClick} alt={props.name} />
            <div className="elements__description">
                <h2 className="elements__title">{props.name}</h2>
                <div className="elements__likes">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <span className="elements__amount">{props.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;