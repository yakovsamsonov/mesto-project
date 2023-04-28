export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key == "Escape") {
      this.close();
    }
  }

  _handleClickClose(evt) {
    const eventElementClasses = evt.target.classList;
    if (
      eventElementClasses.contains("popup__close-button") ||
      eventElementClasses.contains("popup")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", this._handleClickClose.bind(this));
  }
}
