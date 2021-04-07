import React from 'react';

export default function PopupWithForm(props){
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <form action="/" name={props.name} className="popup__container" noValidate>
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <fieldset className="popup__fieldset">
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          {/* <input type="url" name="profileAvatarLink" placeholder="Ссылка на аватар" className="popup__input popup__input_value_src" required />
          <p className="popup__error profileAvatarLink-error"></p> */}
          <button type="submit" className="popup__save-button">Сохранить</button>
        </fieldset>
      </form>
    </div>
  )
}