export default class Section {
  constructor({ renderer, selector }) {
    this._container = document.querySelector(selector);
    this._renderer = renderer;
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

  renderItems(data) {
    this._clear();
    this._data = data;

    this._data.forEach((item) => {
      this._renderer(item);
    });
  }
}
