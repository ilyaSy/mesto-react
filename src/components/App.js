import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
// import PopupWithForm from './PopupWithForm';
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
  //const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [deleteCard, setDeleteCard] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards)
      })
      .catch(err => console.log('Ошибка: ' + err))
  }, []);

  //close on Escape button
  const closeByEscapeBtn = event => {
    if (event && event.key === 'Escape') {
      closeAllPopups();
    }
  }

  const handleEditAvatarClick = () => {
    document.addEventListener('keydown', closeByEscapeBtn);
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const handleEditProfileClick = () => {
    document.addEventListener('keydown', closeByEscapeBtn);
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }


  const handleAddPlaceClick = () => {
    document.addEventListener('keydown', closeByEscapeBtn);
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const handleDeleteClick = (card) => {
    document.addEventListener('keydown', closeByEscapeBtn);
    // setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setDeleteCard(card);
  }

  const handleCardClick = (card) => {
    document.addEventListener('keydown', closeByEscapeBtn);
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);    
    // setIsConfirmPopupOpen(false);
    setDeleteCard(null);
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
    
    api.likeCard(card._id, isLiked)
      .then(newCard => { setCards(cards => cards.map(c => c._id === card._id ? newCard : c)) })
      .catch(err => console.log('Ошибка: ' + err))
  }

  const handleCardDelete = () => {
    const card = deleteCard;
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
        <ConfirmDeletePopup isOpen={deleteCard ? true : false} onClose={closeAllPopups} onDeletePlace={handleCardDelete}/>

        {/* <PopupWithForm title='Вы уверены?' name='confirm' submitBtnName='Да' isOpen={isConfirmPopupOpen} onClose={closeAllPopups} /> */}       

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
    :
    <>
      <Header />
      <h1 className="content__title">Данные загружаются ... </h1>
    </>
  );
}

export default App;
