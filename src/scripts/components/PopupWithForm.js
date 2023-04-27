import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit, validator) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._button = this._form.querySelector(".form__action-button");
    this._validator = validator;
    this._inputs = Array.from(this._form.querySelectorAll(".form__input"));
    this._buttonText = this._button.textContent;
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

      this._button.textContent = "Сохранение...";
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this._button.textContent = this._buttonText;
        });
    }).bind(this));
  }

  open(values) {
    this._form.reset();
    this._validator.hideFormErrors();
    if (values) {
      for (const [name, value] of Object.entries(values)) {
        this._form[name].value = value;
      }
    }

    this._validator.toggleButtonState();
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
