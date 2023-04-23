import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, handleConfirm) {
    super(selector);
    this._handleConfirm = handleConfirm;
    this._button = this._popup.querySelector(".form__action-button");
  }

  open(data) {
    this._data = data;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", (evt => {
      evt.preventDefault();
      this._handleConfirm.call(this, this._data);
    }).bind(this));
  }
}
