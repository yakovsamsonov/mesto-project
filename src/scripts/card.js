export class CardPrototype {
  constructor(
    {
      handleLikeClick,
      handleDeleteClick,
      handleCardClick,
      deleteCard,
      saveCard,
    },
    selector
  ) {
    this.handleLikeClick = handleLikeClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleCardClick = handleCardClick;
    this.saveCard = saveCard;
    this._deleteCard = deleteCard;
    this.selector = selector;
  }

  deleteCard(cardId) {
    return this._deleteCard(cardId);
  }
}

export class Card {
  constructor(
    { _id, name, link, likes, owner },
    { handleLikeClick, handleDeleteClick, handleCardClick, saveCard, selector }
  ) {
    this._selector = selector;
    this._id = _id;
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._setLikes(likes);
    this._handleLikeClick = handleLikeClick.bind(this);
    this._handleDeleteClick = handleDeleteClick.bind(this);
    this._handleCardClick = handleCardClick.bind(this);
    this._saveCard = saveCard.bind(this);
  }

  get element() {
    return this._element;
  }

  get cardId() {
    return this._id;
  }

  _setElement() {
    this._element = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners(userId) {
    if (this._owner["_id"] === userId) {
      this._deleteButton.addEventListener("click", this._handleDeleteClick);
    } else {
      this._deleteButton.remove();
    }

    this._likeButton.addEventListener("click", this._handleLikeClick);
    this._cardItemPhoto.addEventListener("click", this._handleCardClick);
  }

  enrichCard({ _id, name, link, likes, owner }, userId) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._setLikes(likes);
    this._owner = owner;
    this._createCard(userId);
  }

  saveCard() {
    return this._saveCard(this._name, this._link);
  }

  _createCard(userId) {
    this._setElement();
    this._cardItemPhoto = this._element.querySelector(".card__item-photo");
    this._cardItemLabel = this._element.querySelector(".card__item-label");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._element.dataset.cardId = this._id;

    this._cardItemPhoto.src = this._link;
    this._cardItemPhoto.alt = this._name;
    this._cardItemLabel.textContent = this._name;
    this.toggleLikeButton(this._likes, userId);
    this._setEventListeners(userId);
  }

  hasUserLike(userId) {
    return this._likes.some((like) => {
      return like["_id"] === userId;
    });
  }

  toggleLikeButton(likes, userId) {
    this._setLikes(likes);
    if (this.hasUserLike(userId)) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
    this._likeButton.dataset.likesCount = this._likes.length;
  }

  _setLikes(likes) {
    this._likes = likes;
  }
}
