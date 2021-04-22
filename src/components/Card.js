import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Card(props){
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = `element__delete-button ${isOwn ? '' : 'element__delete-button_disactive'}`;
  const cardLikeButtonClassName = `element__caption-like ${isLiked ? 'element__caption-like_active' : ''}`;

  const handleClick = () => { props.onCardClick(props.card) }

  return (
    <figure className="element">
      <img src={props.card.link} alt="Изображение не может быть показано" className="element__picture" onClick={handleClick}/>
      <figcaption className="element__caption">
        <h2 className="element__caption-text">{props.card.name}</h2>
        <div className='element__caption-like-group'>
          <button type="button" className={cardLikeButtonClassName} onClick={() => {props.onCardLike(props.card)}} ></button>
          <p className="element__caption-like-count">{props.card.likes.length}</p>
        </div>
      </figcaption>
      <button type="button" className={cardDeleteButtonClassName} onClick={() => {props.onDeleteClick(props.card)}}></button>
    </figure>
  )
}