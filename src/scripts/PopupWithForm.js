import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._button = this._form.querySelector('.form__action-button');
  }

  _getInputValues() {
    return Array.from(this._form.querySelectorAll(".form__input"))
      .reduce((result, input) => {
        result[input.name] = input.value;
        return result;
      }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    }).bind(this));
  }

  close() {
    super.close();
    this._form.reset();
  }

  setButtonLabel(label) {
    const oldLabel = this._button.textContent;
    this._button.textContent = label;
    return oldLabel;
  }
}
