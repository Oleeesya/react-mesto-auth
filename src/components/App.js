import React from 'react';
import { useState, useEffect } from 'react';
import { HashRouter, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import api from "../utils/API";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DeletePlacePopup from "./DeletePlacePopup";
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/Auth.js';

import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { currentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectCard] = useState(null);

  const [isTooltip, setTooltip] = React.useState(false);
  const [isRegistrationStatus, setRegistrationStatus] = React.useState(false);
  const [email, setEmail] = useState('');

  const [currentUser, setCurrentUser] = useState({});
  const [currentCard, setcurrentCard] = React.useState('');

  const [loggedIn, setloggedIn] = useState(false);
  const [token, setToken] = useState('');

  const history = useHistory();

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push('/react-mesto-auth');
    }
  }, [loggedIn])

  useEffect(() => {
    tokenCheck();
  })

  const setCardId = (cardInfo) => {
    setcurrentCard(cardInfo);
  }

  const handleLogin = (isLogin) => {
    setloggedIn(isLogin);
  }

  const tokenCheck = () => {
    //проверка токена в LocalStorage
    if (localStorage.getItem('jwt')) {

      setToken(localStorage.getItem('jwt'))
      if (token) {
        auth.getContent(token)
          .then((res) => {
            if (res) {
              const userData = res;
              setEmail(userData.data.email)
              handleLogin(true);
            }
          })
      }
    }
  }

  const handleClickAvatar = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleRegistrationStatus = () => {
    setRegistrationStatus(true);
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

  const handleTooltip = () => {
    setTooltip(true);
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
    setTooltip(false);
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
    <HashRouter>
      <currentUserContext.Provider value={currentUser}>

        <div className="App">
          <div className="page">

            <Switch>
              {loggedIn && <Main onEditAvatar={handleClickAvatar} onEditProfile={handleClickProfile} onAddPlace={handleClickPlace}
                onCardClick={handleCardClick} openDeleteClick={handleDeleteCardClick} cards={cards} onCardLike={handleCardLike}
                email={email} setToken={setToken} handleLogin={handleLogin} />}

              <ProtectedRoute
                exact path="/react-mesto-auth"
                loggedIn={loggedIn}
                component={Main}
              />

              <Route path="/sign-in">
                <Login onClose={closeAllPopups} handleOpenTooltip={handleTooltip} isTooltip={isTooltip}
                  handleRegistrationStatus={handleRegistrationStatus} isRegistrationStatus={isRegistrationStatus}
                  handleLogin={handleLogin} />
              </Route>
              <Route path="/sign-up">
                <Register onClose={closeAllPopups} handleOpenTooltip={handleTooltip} isTooltip={isTooltip}
                  handleRegistrationStatus={handleRegistrationStatus} isRegistrationStatus={isRegistrationStatus} />
              </Route>
              <Route exact path="/react-mesto-auth">
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>

            {loggedIn && <Footer />}

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>

            <AddPlacePopup onAddPlace={handleAddPlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} cards={cards}></AddPlacePopup>

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

            <DeletePlacePopup name="remove-card" title="Вы уверены?" isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups}
              onCardDelete={handleCardDelete} id={currentCard}></DeletePlacePopup>

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>

          </div>
        </div>


      </currentUserContext.Provider >
    </HashRouter>
  );
}

export default App;
