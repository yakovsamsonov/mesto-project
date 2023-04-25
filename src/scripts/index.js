import "../pages/index.css";

import * as constants from "./constants.js";
import Api from "./components/Api";
import Card from "./components/Сard.js";
import CardPrototype from "./components/CardPrototype.js";
import UserInfo from "./components/UserInfo.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage";
import PopupWithForm from "./components/PopupWithForm";
import PopupWithConfirmation from "./components/PopupWithConfirmation";

const api = new Api(constants.apiconfig);

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

const cardPopup = new PopupWithForm(".popup_type_add-card",
  ({ label, link }) => {
    const card = new Card(
      {
        name: label,
        link: link,
      },
      cardPrototype
    );
    return api
      .saveCard(card.getName(), card.getLink())
      .then((data) => {
        card.enrichCard(data, userInfo.userId);
        console.log(card.element);
        imageSection.addItemToStart(card.element);
      });
  },
  constants.validationSettings
);

const avatarPopup = new PopupWithForm(".popup_type_edit-avatar",
  inputValues => userInfo.setUserInfo({ avatar: inputValues["avatar-link"] }),
  constants.validationSettings);

const profilePopup = new PopupWithForm(".popup_type_edit-profile",
  ({ name, description }) => {
    return userInfo
      .setUserInfo({
        name: name,
        about: description,
      });
  },
  constants.validationSettings
);

const imagePopup = new PopupWithImage(".fullscreen-image");
const confirmationPopup = new PopupWithConfirmation(".popup_type_confirm-delete",
  (cardId) => cardPrototype.deleteCard(cardId));

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


Promise.all([userInfo.getUserInfo(), imageSection.getCards()])
  .then(() => {
    userInfo.renderProfile();
    imageSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

constants.editProfileButton.addEventListener("click", () =>
  profilePopup.open({ name: userInfo.name, description: userInfo.about }));
constants.addNewCardButton.addEventListener("click", () => cardPopup.open());
constants.profileAvatar.addEventListener("click", () => avatarPopup.open());

cardPopup.setEventListeners();
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
imagePopup.setEventListeners();
confirmationPopup.setEventListeners();
