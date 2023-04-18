import "../pages/index.css";

import * as constants from "./constants.js";
import { enableValidation, hideFormErrors } from "./validate.js";
import { Card, CardPrototype } from "./card.js";
import { renderProfile } from "./profile.js";
import { closePopup, openPopup } from "./modal.js";
import Section from "./section.js";

import {
  loadProfile,
  loadCards,
  deleteCard,
  saveCard,
  saveLike,
  updateAvatar,
  updateProfile,
} from "./api.js";

function submitForm(evt) {
  evt.target.reset();
  closePopup(evt.target.closest(".popup"));
}

function openEditAvatarWindow() {
  const popup = constants.avatarPopup;
  hideFormErrors(popup.querySelector(".form"), constants.validationSettings);
  openPopup(popup);
}

function openEditProfileWindow() {
  constants.profileNameInput.value = constants.profileName.textContent;
  constants.profileDescriptionInput.value =
    constants.profileDescription.textContent;
  const popup = constants.profilePopup;
  hideFormErrors(popup.querySelector(".form"), constants.validationSettings);
  openPopup(popup);
}

function openAddCardWindow() {
  const popup = constants.cardPopup;
  hideFormErrors(popup.querySelector(".form"), constants.validationSettings);
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
      imageSection.remove(cardId);
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
      const cardElement = new Card(card, cardPrototype);
      cardElement.createCard(constants.profileInfo.dataset.id);
      imageSection.addToStart(cardElement.element);
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

const cardPrototype = new CardPrototype(
  {
    pressLike: function () {
      saveLike(
        this.getCardId(),
        this.hasUserLike(constants.profileInfo.dataset.id)
      )
        .then((data) => {
          this.toggleLikeButton(data.likes, constants.profileInfo.dataset.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCard: function () {
      const popup = constants.confirmationPopup;
      popup.dataset.cardId = this._id;
      openPopup(popup);
    },
    openCard: function () {
      constants.fullscreenImagePicture.src = this._link;
      constants.fullscreenImagePicture.alt = this._name;
      constants.fullscreenImageLabel.textContent = this._name;
      openPopup(constants.imagePopup);
    },
  },
  "#card-template"
);

const imageSection = new Section({
  renderer: (item) => {
    const cardElement = new Card(item, cardPrototype);
    cardElement.createCard(constants.profileInfo.dataset.id);
    imageSection.addToEnd(cardElement.element);
  },
  container: constants.imageContainer,
});

Promise.all([loadProfile(), loadCards()])
  .then((results) => {
    renderProfile(results[0]);
    imageSection.renderItems(results[1]);
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(constants.validationSettings);
