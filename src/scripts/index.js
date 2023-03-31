import "../pages/index.css";

import * as constants from "./constants.js";
import { enableValidation, checkFormValidity } from "./validate.js";
import { renderCard } from "./card.js";
import { renderProfile } from "./profile.js";
import { closePopup, openPopup } from "./modal.js";

import {
  loadProfile,
  loadCards,
  deleteCard,
  saveCard,
  updateAvatar,
  updateProfile,
} from "./api.js";

function submitForm(evt) {
  evt.target.reset();
  closePopup(evt.target.closest(".popup"));
}

function openEditAvatarWindow() {
  const popup = constants.avatarPopup;
  checkFormValidity(popup.querySelector(".form"), constants.validationSettings);
  openPopup(popup);
}

function openEditProfileWindow() {
  constants.profileNameInput.value = constants.profileName.textContent;
  constants.profileDescriptionInput.value =
    constants.profileDescription.textContent;
  const popup = constants.profilePopup;
  checkFormValidity(popup.querySelector(".form"), constants.validationSettings);
  openPopup(popup);
}

function openAddCardWindow() {
  const popup = constants.cardPopup;
  checkFormValidity(popup.querySelector(".form"), constants.validationSettings);
  openPopup(popup);
}

function processClickOnPopup(evt) {
  const eventElementClasses = evt.target.classList;
  if (
    eventElementClasses.contains("popup__close-button") ||
    eventElementClasses.contains("popup")
  ) {
    closePopup(evt.currentTarget);
  }
}

function changeButtonLabelOnPopup(form, label) {
  const button = form.querySelector(
    constants.validationSettings.submitButtonSelector
  );
  const oldLabel = button.textContent;
  button.textContent = label;
  return oldLabel;
}

function confirmCardDelete(evt) {
  const cardId = constants.confirmationPopup.dataset.cardId;
  deleteCard(cardId)
    .then(() => {
      constants.imageContainer.childNodes.forEach((card) => {
        if (cardId === card.dataset.cardId) {
          card.remove();
        }
      });
      closePopup(evt.target.closest(".popup"));
      constants.confirmationPopup.dataset.cardId = "";
    })
    .catch((err) => {
      console.log(err);
    });
}

function submitCardForm(evt) {
  evt.preventDefault();
  const oldButtonLabel = changeButtonLabelOnPopup(evt.target, "Сохранение...");
  saveCard(constants.cardLabelInput.value, constants.cardLinkInput.value)
    .then((card) => {
      renderCard(constants.imageContainer, card);
      submitForm(evt);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButtonLabelOnPopup(evt.target, oldButtonLabel);
    });
}

function submitProfileForm(evt) {
  evt.preventDefault();
  const oldButtonLabel = changeButtonLabelOnPopup(evt.target, "Сохранение...");
  updateProfile(
    constants.profileNameInput.value,
    constants.profileDescriptionInput.value
  )
    .then((profile) => {
      renderProfile(profile);
      submitForm(evt);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButtonLabelOnPopup(evt.target, oldButtonLabel);
    });
}

function submitAvatarFrom(evt) {
  evt.preventDefault();
  const oldButtonLabel = changeButtonLabelOnPopup(evt.target, "Сохранение...");
  updateAvatar(constants.avatarLinkInput.value)
    .then((profile) => {
      renderProfile(profile);
      submitForm(evt);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButtonLabelOnPopup(evt.target, oldButtonLabel);
    });
}

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
