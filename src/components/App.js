import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

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

  const handleCardClick = (card) => {
    document.addEventListener('keydown', closeByEscapeBtn);
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    document.removeEventListener('keydown', closeByEscapeBtn);
  }

  return (
    <>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}/>
      <Footer />

      <PopupWithForm title='Редактировать профиль' name='edit' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input type="text" name="profileName" placeholder="Имя" className="popup__input popup__input_value_name" minLength="2" maxLength="40" required />
        <p className="popup__error profileName-error"></p>
        <input type="text" name="profileJob" placeholder="Профессия" className="popup__input popup__input_value_job" minLength="2" maxLength="200" required />
        <p className="popup__error profileJob-error"></p>
      </PopupWithForm>

      <PopupWithForm title='Новое место' name='add' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input type="text" name="name" placeholder="Название" className="popup__input popup__input_value_text" minLength="2" maxLength="30" required />
        <p className="popup__error name-error"></p>
        <input type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_value_src" required />
        <p className="popup__error link-error"></p>
      </PopupWithForm>

      <PopupWithForm title='Обновить аватар' name='ava' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input type="url" name="profileAvatarLink" placeholder="Ссылка на аватар" className="popup__input popup__input_value_src" required />
        <p className="popup__error profileAvatarLink-error"></p>
      </PopupWithForm>

      {/* <PopupWithForm title='Вы уверены?' name='confirm' isOpen={} onClose={} /> */}

      <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups}/>

      <div className="popup popup_type_confirm">
        <form action="/" name="popupConfirm" className="popup__container" noValidate>
          <button type="button" className="popup__close-button"></button>
          <fieldset className="popup__fieldset">
            <h2 className="popup__title">Вы уверены?</h2>
            <button type="submit" className="popup__save-button">Да</button>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default App;
