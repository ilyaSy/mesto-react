import React from 'react';

export default function Card(props){
  const handleClick = () => {
    props.onCardClick(props.card);
  }

  return (
    <figure className="element">
      <img src={props.card.link} alt="Изображение не может быть показано" className="element__picture" onClick={handleClick}/>
      <figcaption className="element__caption">
        <h2 className="element__caption-text">{props.card.name}</h2>
        <div className='element__caption-like-group'>
          <button type="button" className="element__caption-like"></button>
          <p className="element__caption-like-count">{props.card.likes.length}</p>
        </div>
      </figcaption>
      <button type="button" className="element__delete-button"></button>        
    </figure>
  )
}