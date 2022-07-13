import React from 'react';
import Card from "./Card";
import { currentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(currentUserContext);

    return (
        <>
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar" onClick={props.onEditAvatar}>
                        <img className="profile__img" src={currentUser.avatar} alt="Жак-Ив Кусто" />
                    </div>
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <p className="profile__subtitle">{currentUser.about}</p>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
                    </button>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                {props.cards.map((card) => {

                    return (
                        <Card key={card._id} link={card.link} name={card.name} likes={card.likes} onCardClick={props.onCardClick}
                            onCardDelete={props.openDeleteClick} currentCard={card} id={card._id} onCardLike={props.onCardLike}
                        />
                    )
                })
                }

            </section>
        </>
    );
}

export default Main;