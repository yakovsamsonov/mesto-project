import * as constants from "./constants.js";
import { addNewCard } from "./card.js";
import { openPopup, closePopup } from "./utils.js";

function submitForm(evt) {
  evt.preventDefault();

  const buttonElement = evt.target.querySelector(
    constants.validationSettings.submitButtonSelector
  );
  buttonElement.classList.add(constants.validationSettings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);

  evt.target.reset();
  closePopup(evt.target.closest(".popup"));
}

function submitCardForm(evt) {
  addNewCard(constants.cardLinkInput.value, constants.cardLabelInput.value);
  submitForm(evt);
}

function submitProfileForm(evt) {
  constants.profileName.textContent = constants.profileNameInput.value;
  constants.profileDescription.textContent =
    constants.profileDescriptionInput.value;
  submitForm(evt);
}

function submitAvatarFrom(evt) {
  constants.profileAvatarImage.src = constants.avatarLinkInput.value;
  submitForm(evt);
}

function openEditAvatarWindow() {
  openPopup(constants.avatarPopup);
}

function openEditProfileWindow() {
  openPopup(constants.profilePopup);

  constants.profileNameInput.value = constants.profileName.textContent;
  constants.profileDescriptionInput.value =
    constants.profileDescription.textContent;
}

function openAddCardWindow() {
  openPopup(constants.cardPopup);
}

function openCardImage(source, label) {
  openPopup(constants.imagePopup);

  constants.fullscreenImagePicture.src = source;
  constants.fullscreenImagePicture.alt = label;
  constants.fullscreenImageLabel.textContent = label;
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

export {
  openCardImage,
  openEditProfileWindow,
  openEditAvatarWindow,
  openAddCardWindow,
  processClickOnPopup,
  submitCardForm,
  submitProfileForm,
  submitAvatarFrom,
};
