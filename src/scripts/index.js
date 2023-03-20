import "../pages/index.css";

import * as constants from "./constants.js";
import { enableValidation } from "./validate.js";
import { loadCards } from "./card.js";
import {
  openEditProfileWindow,
  openAddCardWindow,
  processClickOnPopup,
  submitCardForm,
  submitProfileForm,
} from "./modal.js";

function renderPage() {
  constants.editProfileButton.addEventListener("click", openEditProfileWindow);
  constants.addNewCardButton.addEventListener("click", openAddCardWindow);
  constants.popups.forEach((popup) => {
    popup.addEventListener("click", processClickOnPopup);
  });
  constants.cardForm.addEventListener("submit", submitCardForm);
  constants.profileForm.addEventListener("submit", submitProfileForm);

  loadCards();
}

renderPage();
enableValidation(constants.validationSettings);
