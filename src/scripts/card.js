export class CardPrototype {
  constructor({ pressLike, deleteCard, openCard }, selector) {
    this.pressLike = pressLike;
    this.deleteCard = deleteCard;
    this.openCard = openCard;
    this.selector = selector;
  }
}

export class Card {
  constructor(
    { _id, name, link, likes, owner },
    { pressLike, deleteCard, openCard, selector }
  ) {
    this._selector = selector;
    this._id = _id;
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._setLikes(likes);
    this._pressLike = pressLike.bind(this);
    this._deleteCard = deleteCard.bind(this);
    this._openCard = openCard.bind(this);
  }

  get element() {
    return this._element;
  }

  _setElement() {
    this._element = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  createCard(userId) {
    this._setElement();
    const cardItemPhoto = this._element.querySelector(".card__item-photo");
    const cardItemLabel = this._element.querySelector(".card__item-label");
    const deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._element.dataset.cardId = this._id;

    cardItemPhoto.src = this._link;
    cardItemPhoto.alt = this._name;
    cardItemLabel.textContent = this._name;

    if (this._owner["_id"] === userId) {
      deleteButton.addEventListener("click", this._deleteCard);
    } else {
      deleteButton.remove();
    }

    this.toggleLikeButton(this._likes, userId);
    this._likeButton.addEventListener("click", this._pressLike);
    cardItemPhoto.addEventListener("click", this._openCard);
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

  getCardId() {
    return this._id;
  }

  _setLikes(likes) {
    this._likes = likes;
  }
}
