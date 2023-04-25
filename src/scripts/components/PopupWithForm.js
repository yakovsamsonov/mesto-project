import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this.form = this._popup.querySelector(".form");
    this._button = this.form.querySelector(".form__action-button");
  }

  _getInputValues() {
    return Array.from(this.form.querySelectorAll(".form__input"))
      .reduce((result, input) => {
        result[input.name] = input.value;
        return result;
      }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (evt => {
      evt.preventDefault();

      const oldButtonLabel = this._setButtonLabel("Сохранение...");
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this._setButtonLabel(oldButtonLabel);
        });
    }).bind(this));
  }

  close() {
    super.close();
    this.form.reset();
  }

  _setButtonLabel(label) {
    const oldLabel = this._button.textContent;
    this._button.textContent = label;
    return oldLabel;
  }
}
