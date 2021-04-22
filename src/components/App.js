import React from 'react';

import Loading from './Loading';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [сardToDelete, setCardToDelete] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([])
  const [textLoading, setTextLoading] = React.useState("Данные загружаются...");

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards)
      })
      .catch(err => {
        console.log('Ошибка: ' + err);
        setTextLoading('Ошибка при загрузке данных!');
      })
  }, []);

  //close on Escape button
  const closeByEscapeBtn = event => {
    if (event && event.key === 'Escape') {
      closeAllPopups();
    }
  }

  const handleEditAvatarClick = () => {
    document.addEventListener('keydown', closeByEscapeBtn);
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    document.addEventListener('keydown', closeByEscapeBtn);
    setIsEditProfilePopupOpen(true);
  }


  const handleAddPlaceClick = () => {
    document.addEventListener('keydown', closeByEscapeBtn);
    setIsAddPlacePopupOpen(true);
  }

  const handleDeleteClick = (card) => {
    document.addEventListener('keydown', closeByEscapeBtn);
    setCardToDelete(card);
  }

  const handleCardClick = (card) => {
    document.addEventListener('keydown', closeByEscapeBtn);
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setCardToDelete(null);
    setSelectedCard(null);
    document.removeEventListener('keydown', closeByEscapeBtn);
  }

  const handleUpdateUser = ({name, about}) => {
    api.editUserInfo({name, about})
      .then(userData => {setCurrentUser(userData)})
      .then(() => {closeAllPopups()})
      .catch(err => console.log('Ошибка: ' + err))
  }

  const handleUpdateAvatar = avatar => {
    api.setUserAvatar( avatar )
      .then(userData => {setCurrentUser(userData)})
      .then(() => {closeAllPopups()})
      .catch(err => console.log('Ошибка: ' + err))
  }

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.toggleLikeCard(card._id, isLiked)
      .then(newCard => { setCards(cards => cards.map(c => c._id === card._id ? newCard : c)) })
      .catch(err => console.log('Ошибка: ' + err))
  }

  const handleCardDelete = () => {
    const card = сardToDelete;
    api.deleteCard(card._id)
      .then(() => { setCards(cards => cards.filter(c => c._id !== card._id)) })
      .then(() => {closeAllPopups()})
      .catch(err => console.log('Ошибка: ' + err))
  }

  const handleAddPlaceSubmit = card => {
    api.addCard(card)
      .then(newCard => {setCards([newCard, ...cards])})
      .then(() => {closeAllPopups()})
      .catch(err => console.log('Ошибка: ' + err))
  }

  return (
    currentUser && cards ?
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
          cards={cards}
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDeleteClick={handleDeleteClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}/>
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <ConfirmDeletePopup isOpen={сardToDelete ? true : false} onClose={closeAllPopups} onDeletePlace={handleCardDelete}/>

        {/* <PopupWithForm title='Вы уверены?' name='confirm' submitBtnName='Да' isOpen={isConfirmPopupOpen} onClose={closeAllPopups} /> */}       

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
    :
    <Loading text={textLoading}/>
  );
}

export default App;
