import * as utils from "./utils.js";
import { addNewCard } from "./card.js";

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  const popupForm = popup.querySelector(".form");
  if (popupForm) {
    popupForm.reset();
  }
}

function submitForm(evt) {
  evt.preventDefault();

  if (evt.target.id === "card") {
    addNewCard(utils.cardLinkInput.value, utils.cardLabelInput.value);
  } else if (evt.target.id == "profile") {
    utils.profileName.textContent = utils.profileNameInput.value;
    utils.profileDescription.textContent = utils.profileDescriptionInput.value;
  } else if (evt.target.id === "avatar") {
    utils.profileAvatarImage.src = utils.avatarLinkInput.value;
  }

  closePopup(evt.target.closest(".popup"));
}

function openEditAvatarWindow() {
  openPopup(utils.avatarPopup);
}

function openEditProfileWindow() {
  openPopup(utils.profilePopup);

  utils.profileNameInput.value = utils.profileName.textContent;
  utils.profileDescriptionInput.value = utils.profileDescription.textContent;
}

function openAddCardWindow() {
  openPopup(utils.cardPopup);
}

function openCardImage(source, label) {
  openPopup(utils.imagePopup);

  utils.fullscreenImagePicture.src = source;
  utils.fullscreenImagePicture.alt = label;
  utils.fullscreenImageLabel.textContent = label;
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

function processKeybord(event) {
  if (event.keyCode == 27) {
    const openedPopups = document.querySelectorAll(".popup_opened");
    openedPopups.forEach((el) => {
      closePopup(el);
    });
  }
}

export {
  openCardImage,
  processKeybord,
  openEditProfileWindow,
  openEditAvatarWindow,
  openAddCardWindow,
  processClickOnPopup,
  submitForm,
};
