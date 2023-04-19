import "../pages/index.css";

import * as constants from "./constants.js";
import { enableValidation, hideFormErrors } from "./validate.js";
import { Card, CardPrototype } from "./card.js";
import UserInfo from "./profile.js";
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
  constants.profileNameInput.value = userInfo.name;
  constants.profileDescriptionInput.value = userInfo.about;
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
  cardPrototype
    .deleteCard(cardId)
    .then(() => {
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
  const card = new Card(
    {
      name: constants.cardLabelInput.value,
      link: constants.cardLinkInput.value,
    },
    cardPrototype
  );
  card
    .saveCard()
    .then(() => {
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
  userInfo
    .setUserInfo({
      name: constants.profileNameInput.value,
      about: constants.profileDescriptionInput.value,
    })
    .then(() => {
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
  userInfo
    .setUserInfo({ avatar: constants.avatarLinkInput.value })
    .then(() => {
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

const userInfo = new UserInfo(
  {
    nameSelector: ".profile__name",
    descriptionSelector: ".profile__description",
    avatarSelector: ".profile__avatar-image",
  },
  {
    loadProfile: () => {
      return loadProfile();
    },
    updateProfile: (newName, newDescription) => {
      return updateProfile(newName, newDescription);
    },
    updateAvatar: (newAvatar) => {
      return updateAvatar(newAvatar);
    },
  }
);

const cardPrototype = new CardPrototype(
  {
    handleLikeClick: function () {
      saveLike(this.cardId, this.hasUserLike(userInfo.userId))
        .then((data) => {
          this.toggleLikeButton(data.likes, userInfo.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteClick: function () {
      const popup = constants.confirmationPopup;
      popup.dataset.cardId = this.cardId;
      openPopup(popup);
    },
    handleCardClick: function () {
      constants.fullscreenImagePicture.src = this._link;
      constants.fullscreenImagePicture.alt = this._name;
      constants.fullscreenImageLabel.textContent = this._name;
      openPopup(constants.imagePopup);
    },
    deleteCard: (cardId) => {
      return deleteCard(cardId).then(() => {
        imageSection.remove(cardId);
      });
    },
    saveCard: function (newLabel, newImage) {
      return saveCard(newLabel, newImage).then((card) => {
        this.enrichCard(card, userInfo.userId);
        imageSection.addItemToStart(this.element);
      });
    },
  },
  "#card-template"
);

const imageSection = new Section({
  renderer: (item) => {
    const card = new Card({}, cardPrototype);
    card.enrichCard(item, userInfo.userId);
    imageSection.addItemToEnd(card.element);
  },
  loadCards: () => {
    return loadCards();
  },
  selector: ".elements",
});

Promise.all([userInfo.getUserInfo(), imageSection.getCards()])
  .then(() => {
    userInfo.renderProfile();
    imageSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(constants.validationSettings);
