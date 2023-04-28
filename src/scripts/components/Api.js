export default class Api {
  constructor(options) {
    this.options = options;
  }

  _request(endpoint, options) {
    return fetch(`${this.options.baseUrl}${endpoint}`, options).then(this._checkResponse);
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log(`HTTP ошибка! статус: ${response.status}`);
    }
  }

  loadProfile() {
    return this._request('/users/me', {
      headers: this.options.headers
    });
  }

  updateProfile(name, about) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        about
      })
    });
  }

  updateAvatar(avatarImageLink) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: avatarImageLink,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
    });
  }

  loadCards() {
    return this._request('/cards', {
      headers: this.options.headers
    });
  }

  saveCard(name, link) {
    return this._request('/cards', {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        link
      })
    });
  }

  toggleLike(cardId, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    return this._request(`/cards/likes/${cardId}`, {
      method,
      headers: this.options.headers
    });
  }
}
