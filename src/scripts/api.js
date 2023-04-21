import { apiconfig } from './constants.js'
export const apiconfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: '2d446760-eb73-474d-999b-cb7f739e396a',
    'Content-Type': 'application/json'
  },
  id: "3BmSRqjRZYsE2r3pW6NrQ",
  emailAddress: "plus-cohort-22@ya.ru"
}

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    console.log(`HTTP ошибка! статус: ${response.status}`);
  }
}

export default class Api {
  constructor(options) {
    this.options = options;
  }

  loadProfile() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers
    }).then(checkResponse)
  }

  updateProfile(name, about) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(checkResponse)
  }

  updateAvatar(avatarImageLink) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: avatarImageLink,
      }),
    })
      .then(checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then(checkResponse)
  }

  loadCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers
    })
      .then(checkResponse)
  }

  saveCard(name, link) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(checkResponse)
  }

  toggleLike(cardId, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    return fetch(`${this.options.baseUrl}/cards/likes/${cardId}`, {
      method,
      headers: this.options.headers
    })
    .then(checkResponse);
  }
}
