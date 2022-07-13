import React from 'react';
import { useState, useEffect } from 'react';
import api from "../utils/API";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DeletePlacePopup from "./DeletePlacePopup";

import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { currentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);

  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [currentCard, setcurrentCard] = React.useState('');
  const setCardId = (cardInfo) => {
    setcurrentCard(cardInfo);
  }

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const handleClickAvatar = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleClickProfile = () => {
    setEditProfilePopupOpen(true);
  }

  const handleClickPlace = () => {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = (link) => {
    setSelectCard(link);
  }

  const handleDeleteCardClick = (id) => {
    setCardId(id)
    setDeletePlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePlacePopupOpen(false);
    setSelectCard(null);
  }

  const handleUpdateUser = (userInfo) => {
    api.editUserInfo(userInfo)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleUpdateAvatar = (userAvatar) => {
    api.editAvatarUser(userAvatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //добавление новой карточки
  useEffect(() => {
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards(cards.filter(c => c._id != card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleAddPlace = (descriptionCard) => {
    api.postCards(descriptionCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />

          <Main onEditAvatar={handleClickAvatar} onEditProfile={handleClickProfile} onAddPlace={handleClickPlace}
            onCardClick={handleCardClick} openDeleteClick={handleDeleteCardClick} cards={cards} onCardLike={handleCardLike}
          />

          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>

          <AddPlacePopup onAddPlace={handleAddPlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} cards={cards}></AddPlacePopup>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <DeletePlacePopup name="remove-card" title="Вы уверены?" isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups}
            onCardDelete={handleCardDelete} id={currentCard}></DeletePlacePopup>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>

        </div>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
