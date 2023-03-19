import "../pages/index.css";

import * as utils from "./utils.js";
import { enableValidation } from "./validate.js";
import { loadCards } from "./card.js";
import {
  processKeybord,
  openEditProfileWindow,
  openAddCardWindow,
  processClickOnPopup,
} from "./modal.js";

function renderPage() {
  document.addEventListener("keydown", processKeybord);

  utils.editProfileButton.addEventListener("click", openEditProfileWindow);
  utils.addNewCardButton.addEventListener("click", openAddCardWindow);
  utils.popups.forEach((popup) => {
    popup.addEventListener("click", processClickOnPopup);
  });

  loadCards();
}

renderPage();

enableValidation({
  formSelector: ".form",
  fieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__action-button",
  inactiveButtonClass: "form__action-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible",
});
