import "../pages/index.css";

import * as constants from "./constants.js";
import { enableValidation, hideFormErrors } from "./validate.js";
import { Card, CardPrototype } from "./card.js";
import UserInfo from "./profile.js";
import { closePopup, openPopup } from "./modal.js";
import Section from "./section.js";
import PopupWithImage from "./PopupWithImage";

import {
  loadProfile,
  loadCards,
  deleteCard,
  saveCard,
  saveLike,
  updateAvatar,
  updateProfile,
} from "./api.js";
import PopupWithForm from "./PopupWithForm";

function openEditAvatarWindow() {
  hideFormErrors(avatarPopup.form, constants.validationSettings);
  avatarPopup.open();
}

function openEditProfileWindow() {
  constants.profileNameInput.value = userInfo.name;
  constants.profileDescriptionInput.value = userInfo.about;
  const popup = constants.profilePopup;
  hideFormErrors(popup.querySelector(".form"), constants.validationSettings);
  openPopup(popup);
}

function openAddCardWindow() {
  hideFormErrors(cardPopup.form, constants.validationSettings);
  cardPopup.open();
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

function submitCardForm({ label, link }) {
  const oldButtonLabel = this.setButtonLabel("Сохранение...");
  const card = new Card(
    {
      name: label,
      link: link,
    },
    cardPrototype
  );
  card
    .saveCard()
    .then(() => this.close())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this.setButtonLabel(oldButtonLabel);
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

function submitAvatarFrom(inputValues) {
  const oldButtonLabel = this.setButtonLabel("Сохранение...");
  userInfo
    .setUserInfo({ avatar: inputValues["avatar-link"] })
    .then(() => this.close())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this.setButtonLabel(oldButtonLabel);
    });
}

constants.editProfileButton.addEventListener("click", openEditProfileWindow);
constants.addNewCardButton.addEventListener("click", openAddCardWindow);
constants.profileAvatar.addEventListener("click", openEditAvatarWindow);
constants.profileForm.addEventListener("submit", submitProfileForm);

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

const cardPopup = new PopupWithForm(".popup_type_add-card", submitCardForm);
cardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(".popup_type_edit-avatar", submitAvatarFrom);
avatarPopup.setEventListeners();

const imagePopup = new PopupWithImage(".fullscreen-image");
imagePopup.setEventListeners();

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
      imagePopup.open(this._link, this._name);
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
