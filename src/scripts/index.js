import "../pages/index.css";

import * as constants from "./constants.js";
import Api from "./Api";
import FormValidator from "./Validate.js";
import Card from "./components/Сard.js";
import CardPrototype from "./components/CardPrototype.js";
import UserInfo from "./components/UserInfo.js";
import Section from "./components/Section.js";
import PopupWithImage from "./PopupWithImage";
import PopupWithForm from "./PopupWithForm";
import PopupWithConfirmation from "./PopupWithConfirmation";

const api = new Api(constants.apiconfig);
//валидация
const profileFormValidator = new FormValidator(constants.validationSettings, constants.profileForm);
profileFormValidator.enableValidation();
const cardAddValidator = new FormValidator(constants.validationSettings, constants.cardAddForm);
cardAddValidator.enableValidation();
const changeAvatarFormValidator = new FormValidator(constants.validationSettings, constants.changeAvatarForm)
changeAvatarFormValidator.enableValidation();

function openEditAvatarWindow() {
  changeAvatarFormValidator.hideFormErrors();
  avatarPopup.open();
}

function openEditProfileWindow() {
  constants.profileNameInput.value = userInfo.name;
  constants.profileDescriptionInput.value = userInfo.about;
  profileFormValidator.hideFormErrors();
  profilePopup.open();
}

function openAddCardWindow() {
  cardAddValidator.hideFormErrors();
  cardPopup.open();
}

function confirmCardDelete(cardId) {
  cardPrototype
    .deleteCard(cardId)
    .then(() => this.close())
    .catch((err) => {
      console.log(err);
    });
}

function submitProfileForm({ name, description }) {
  const oldButtonLabel = this.setButtonLabel("Сохранение...");
  userInfo
    .setUserInfo({
      name: name,
      about: description,
    })
    .then(() => this.close())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this.setButtonLabel(oldButtonLabel);
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

const userInfo = new UserInfo(
  {
    nameSelector: ".profile__name",
    descriptionSelector: ".profile__description",
    avatarSelector: ".profile__avatar-image",
  },
  {
    loadProfile: () => {
      return api.loadProfile();
    },
    updateProfile: (newName, newDescription) => {
      return api.updateProfile(newName, newDescription);
    },
    updateAvatar: (newAvatar) => {
      return api.updateAvatar(newAvatar);
    },
  }
);

const cardPopup = new PopupWithForm(".popup_type_add-card", submitCardForm);
const avatarPopup = new PopupWithForm(
  ".popup_type_edit-avatar",
  submitAvatarFrom
);
const profilePopup = new PopupWithForm(
  ".popup_type_edit-profile",
  submitProfileForm
);
const imagePopup = new PopupWithImage(".fullscreen-image");
const confirmationPopup = new PopupWithConfirmation(
  ".popup_type_confirm-delete",
  confirmCardDelete
);

const cardPrototype = new CardPrototype(
  {
    handleLikeClick: function () {
      api
        .toggleLike(this.cardId, this.hasUserLike(userInfo.userId))
        .then((data) => {
          this.toggleLikeButton(data.likes, userInfo.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteClick: function () {
      confirmationPopup.open(this.cardId);
    },
    handleCardClick: function () {
      imagePopup.open(this._link, this._name);
    },
    deleteCard: (cardId) => {
      return api
        .deleteCard(cardId)
        .then(() => {
          imageSection.remove(cardId);
        })
        .catch((err) => {
          console.log(err);
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
    return api.loadCards();
  },
  selector: ".elements",
});

function submitCardForm({ label, link }) {
  const oldButtonLabel = this.setButtonLabel("Сохранение...");
  const card = new Card(
    {
      name: label,
      link: link,
    },
    cardPrototype
  );
  api
    .saveCard(card.getName(), card.getLink())
    .then((data) => {
      card.enrichCard(data, userInfo.userId);
      console.log(card.element);
      imageSection.addItemToStart(card.element);
    })
    .then(() => {
      this.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this.setButtonLabel(oldButtonLabel);
    });
}

Promise.all([userInfo.getUserInfo(), imageSection.getCards()])
  .then(() => {
    userInfo.renderProfile();
    imageSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

constants.editProfileButton.addEventListener("click", openEditProfileWindow);
constants.addNewCardButton.addEventListener("click", openAddCardWindow);
constants.profileAvatar.addEventListener("click", openEditAvatarWindow);

cardPopup.setEventListeners();
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
imagePopup.setEventListeners();
confirmationPopup.setEventListeners();
