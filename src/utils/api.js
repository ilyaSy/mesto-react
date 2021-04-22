const tokenAuth = '30b18b22-df4e-456d-bb26-16cda3a69c12';
const tokenGroup = 'cohort-21';
const apiURL = 'https://mesto.nomoreparties.co/v1';

export class Api{
  constructor({tokenAuth, tokenGroup, apiURL}){
    this._apiURL = `${apiURL}/${tokenGroup}`;
    this._headers = { 
      authorization: tokenAuth,
      'Content-Type': 'application/json'
    };
  }

  getInitialCards(){
    return fetch(`${this._apiURL}/cards`, {headers: this._headers})
      .then(this._handleApiResult.bind(null, 'getInitialCards'))
  }

  addCard(cardData){
    return fetch(`${this._apiURL}/cards`, {method: 'POST', headers: this._headers, body: JSON.stringify(cardData)})
      .then(this._handleApiResult.bind(null, 'addCard'))
  }
  
  likeCard(cardId, isLiked){
    return fetch(`${this._apiURL}/cards/likes/${cardId}`, {method: isLiked ? 'DELETE' : 'PUT', headers: this._headers})
      .then(this._handleApiResult.bind(null, 'likeCard'))
  }

  deleteCard(cardId){
    return fetch(`${this._apiURL}/cards/${cardId}`, {method: 'DELETE', headers: this._headers,})
      .then(this._handleApiResult.bind(null, 'deleteCard'))
  }

  editUserInfo(userData){
    return fetch(`${this._apiURL}/users/me`, {method: 'PATCH', headers: this._headers, body: JSON.stringify(userData)})
      .then(this._handleApiResult.bind(null, 'editUserInfo'))
  } 

  getUserInfo(){
    return fetch(`${this._apiURL}/users/me`, {headers: this._headers})
      .then(this._handleApiResult.bind(null, 'getUserInfo'))
  }

  setUserAvatar(avatar){
    return fetch(`${this._apiURL}/users/me/avatar`, {method: 'PATCH', headers: this._headers, body: JSON.stringify(avatar)})
      .then(this._handleApiResult.bind(null, 'setUserAvatar'))
  }

  _handleApiResult(fnName, res){
    return res.ok ? res.json() : Promise.reject(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
  }
}

const api = new Api({
  tokenAuth: tokenAuth,
  tokenGroup: tokenGroup,
  apiURL: apiURL
});

export default api;