import "../pages/index.css";

import * as constants from "./constants.js";
import { enableValidation } from "./validate.js";
import { renderCard } from "./card.js";
import { renderProfile } from "./profile.js";
import {
  openEditProfileWindow,
  openAddCardWindow,
  openEditAvatarWindow,
  processClickOnPopup,
} from "./modal.js";

import {
  confirmCardDelete,
  submitCardForm,
  submitProfileForm,
  submitAvatarFrom,
} from "./utils.js";
import { loadProfile, loadCards } from "./api.js";

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
  constants.confirmationPopup
    .querySelector(".form__action-button")
    .addEventListener("click", confirmCardDelete);

  Promise.all([loadProfile(), loadCards()])
    .then((results) => {
      renderProfile(results[0]);
      results[1].forEach((item) => {
        renderCard(constants.imageContainer, item);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

renderPage();
enableValidation(constants.validationSettings);
