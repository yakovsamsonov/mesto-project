export default class FormValidator {
  constructor(validationConfig, formElement) {
      this._validationConfig = validationConfig;
      this._formElement = formElement;
      this._inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
      this._submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
      this._fieldsetList = Array.from(formElement.querySelectorAll(validationConfig.fieldsetSelector));
    }
  

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._validationConfig.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  toggleButtonState() {
    this.toggleButtonState();
  }

  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid);
  }

  _checkInputValidity(input) {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorPatternMessage);
    } else {
      input.setCustomValidity('');
    }

    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input, input.validationMessage);
    }
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(this._validationConfig.inputErrorClass);
    errorElement.classList.add(this._validationConfig.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
  }

  hideFormErrors() {
    this._inputList.forEach(input => {
      this._hideInputError(input);
    });
  }
  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();

    this._fieldsetList.forEach(fieldset => {
      const submitButton = fieldset.querySelector(this._validationConfig.submitButtonSelector);
      const inputList = Array.from(fieldset.querySelectorAll(this._validationConfig.inputSelector));

      inputList.forEach(input => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this._toggleButtonState();
        });
      });

      submitButton.addEventListener('click', () => {
        this._toggleButtonState();
      });
    });
  }
}