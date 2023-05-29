class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
 
  //проверим  ошибки
  _checkResponseStatus(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
 
  //инфо пользователя с сервера
  getUserInfo() {
     return fetch(`${this._url}/users/me`, {
    method: "GET",
    headers: this._headers,
    }).then((res) => this._checkResponseStatus(res))
  };
 
  //обновляем данные пользователя
  editProfile({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    }).then((res) => this._checkResponseStatus(res));
  }
 
  //получение карточек по умолчанию
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponseStatus(res));
  }
 
  editProfileAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkResponseStatus(res));
  }
 
 
  //добавление новой карточки
  addNewCard({name, link}) {
    console.log('addnewcard')
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      }),
    }).then((res) => this._checkResponseStatus(res));
  }
 
  //удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponseStatus(res))
    
  }
 
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponseStatus(res))
    .then((data) => {
      return data.likes; 
    });
  }
 
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponseStatus(res))
    .then((data) => {
      return data.likes; 
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers,
      }).then(res => this._checkResponseStatus(res));
    } else {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: 'DELETE',
          headers: this._headers,
        }).then(res => this._checkResponseStatus(res));
    }
  }
}
 
const api = new Api({
  url: `https://mesto.nomoreparties.co/v1/cohort-63`,
  headers: {
    authorization: "95e95c6c-51d6-4d7a-ab8a-1eae75c75183",
    "Content-Type": "application/json",
  },
});

export default api