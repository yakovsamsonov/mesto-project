import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit, validator) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._button = this._form.querySelector(".form__action-button");
    this._validator = validator;
    this._inputs = Array.from(this._form.querySelectorAll(".form__input"));
  }

  _getInputValues() {
    return this._inputs.reduce((result, input) => {
        result[input.name] = input.value;
        return result;
      }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this._validator.enableValidation();
    this._form.addEventListener("submit", (evt => {
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

  toggleSubmitButton(){
    this._validator.toggleButtonState();
  }

  open(values) {
    this._form.reset();
    this._validator.hideFormErrors();
    if (values) {
      for (const [name, value] of Object.entries(values)) {
        this._form[name].value = value;
      }
    }
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }

  _setButtonLabel(label) {
    const oldLabel = this._button.textContent;
    this._button.textContent = label;
    return oldLabel;
  }
}
