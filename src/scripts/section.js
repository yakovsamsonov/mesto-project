export default class Section {
  constructor({ renderer, container }) {
    this._container = container;
    this._renderer = renderer;
  }

  addToStart(item) {
    this._container.prepend(item);
  }

  addToEnd(item) {
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

    data.forEach((item) => {
      this._renderer(item);
    });
  }
}
