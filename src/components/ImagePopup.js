export default function ImagePopup(props){
  return (
    <div className={`popup popup_type_show ${props.selectedCard && 'popup_opened'}`}>
      <figure className="popup__card">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <img src={props.selectedCard.link} alt="Изображение не может быть показано" className="popup__picture" />
        <figcaption className="popup__caption">{props.selectedCard.name}</figcaption>
      </figure>
    </div>
  )
}