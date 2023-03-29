import "../pages/index.css";

import * as constants from "./constants.js";
import { enableValidation } from "./validate.js";
import { loadCards } from "./card.js";
import {
  openEditProfileWindow,
  openAddCardWindow,
  openEditAvatarWindow,
  processClickOnPopup,
  submitCardForm,
  submitProfileForm,
  submitAvatarFrom,
} from "./modal.js";
import { loadProfile } from "./api.js";

function renderPage() {
  constants.editProfileButton.addEventListener("click", openEditProfileWindow);
  constants.addNewCardButton.addEventListener("click", openAddCardWindow);
  constants.profileAvatar.addEventListener("click", openEditAvatarWindow);
  constants.popups.forEach((popup) => {
    popup.addEventListener("click", processClickOnPopup);
  });
  constants.cardForm.addEventListener("submit", submitCardForm);
  constants.profileForm.addEventListener("submit", submitProfileForm);
  constants.avatarForm.addEventListener("submit", submitAvatarFrom);
  loadProfile();
  loadCards();
}

renderPage();
enableValidation(constants.validationSettings);
