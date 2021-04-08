import React from 'react';
import profile from '../images/profile.jpg';
import Card from './Card';
import api from '../utils/api';

export default function Main(props){
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(profile);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([userData, initialCards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        
        setCards(initialCards);
      })
      .catch(err => console.log('Ошибка: ' + err))
  }, []);

  return (
    <main className="content">
      <section className="profile" aria-label="content">
        <div className="profile__avatar-container">
          <img src={userAvatar} alt="Фото: аватар пользователя" className="profile__avatar" />
          <button className="profile__edit-ava-button" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__name-block">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" className="button profile__edit-button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button type="button" className="button profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements" aria-label="elements">
        {cards.map((card, i) =>
          <Card card={card} key={`card-${card._id}`} onCardClick={props.onCardClick} onDeleteClick={props.onDeleteClick}/>
        )}
      </section>
    </main>
  )
}