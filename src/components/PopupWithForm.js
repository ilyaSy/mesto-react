import React from 'react';

export default function PopupWithForm(props){
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <form action="/" name={props.name} className="popup__container" noValidate>
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <fieldset className="popup__fieldset">
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__save-button">{props.submitBtnName}</button>
        </fieldset>
      </form>
    </div>
  )
}