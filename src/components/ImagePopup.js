export default function ImagePopup(props){
  return (
    props.card &&
    <div className={`popup popup_type_show ${props.card && 'popup_opened'}`}>
      <figure className="popup__card">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <img src={props.card.link} alt="Изображение не может быть показано" className="popup__picture" />
        <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure>
    </div>
  )
}