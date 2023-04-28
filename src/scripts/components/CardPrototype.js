export default class CardPrototype {
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
