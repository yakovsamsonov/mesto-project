export default class Section {
  constructor({ renderer, loadCards, selector }) {
    this._container = document.querySelector(selector);
    this._renderer = renderer;
    this._loadCards = loadCards;
    this._data = [];
  }

  addItemToStart(item) {
    this._container.prepend(item);
  }

  addItemToEnd(item) {
    this._container.append(item);
  }

  remove(cardId) {
    this._container.childNodes.forEach((card) => {
      if (cardId === card.dataset.cardId) {
        card.remove();
      }
    });
  }

  _clear() {
    this._container.innerHTML = "";
  }

  getCards() {
    return this._loadCards().then((data) => {
      this._data = data;
    });
  }

  renderItems() {
    this._clear();

    this._data.forEach((item) => {
      this._renderer(item);
    });
  }
}
