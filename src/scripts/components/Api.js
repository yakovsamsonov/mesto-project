export default class Api {
  constructor(options) {
    this.options = options;
  }

  checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log(`HTTP ошибка! статус: ${response.status}`);
    }
  }
  

  loadProfile() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers
    }).then(this.checkResponse)
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
      .then(this.checkResponse)
  }

  updateAvatar(avatarImageLink) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: avatarImageLink,
      }),
    })
      .then(this.checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then(this.checkResponse)
  }

  loadCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers
    })
      .then(this.checkResponse)
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
    .then(this.checkResponse)
  }

  toggleLike(cardId, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    return fetch(`${this.options.baseUrl}/cards/likes/${cardId}`, {
      method,
      headers: this.options.headers
    })
    .then(this.checkResponse);
  }
}
