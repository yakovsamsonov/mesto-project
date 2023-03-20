function enableValidation(validation) {
  const formList = Array.from(
    document.querySelectorAll(validation.formSelector)
  );
  formList.forEach((form) => {
    const fieldsetList = Array.from(
      form.querySelectorAll(validation.fieldsetSelector)
    );
    fieldsetList.forEach((fieldset) => {
      setFildsetListeners(fieldset, validation);
    });
  });
}

function setFildsetListeners(fieldset, validation) {
  const inputList = Array.from(
    fieldset.querySelectorAll(validation.inputSelector)
  );
  const submitButton = fieldset.querySelector(validation.submitButtonSelector);
  toggleButtonState(submitButton, inputList, validation);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(fieldset, input, validation);
      toggleButtonState(submitButton, inputList, validation);
    });
  });
}

function toggleButtonState(buttonElement, inputList, validation) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validation.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(validation.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function checkInputValidity(fieldset, input, validation) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorPatternMessage);
  } else {
    input.setCustomValidity("");
  }

  if (input.validity.valid) {
    hideInputError(fieldset, input, validation);
  } else {
    showInputError(fieldset, input, input.validationMessage, validation);
  }
}

function hideInputError(fieldset, input, validation) {
  const errorElement = fieldset.querySelector(`.${input.id}-error`);
  input.classList.remove(validation.inputErrorClass);
  errorElement.classList.remove(validation.errorClass);
  errorElement.textContent = "";
}

function showInputError(fieldset, input, errorMessage, validation) {
  const errorElement = fieldset.querySelector(`.${input.id}-error`);
  input.classList.add(validation.inputErrorClass);
  errorElement.classList.add(validation.errorClass);
  errorElement.textContent = errorMessage;
}

export { enableValidation };
