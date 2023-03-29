import * as constants from "./constants.js";
import { deleteCard, saveCard } from "./card.js";
import { openPopup, closePopup } from "./utils.js";
import { updateProfile, updateAvatar } from "./api.js";

function changeButtonLabelOnForm(form, label) {
  const button = form.querySelector(
    constants.validationSettings.submitButtonSelector
  );
  const oldLabel = button.textContent;
  button.textContent = label;
  return oldLabel;
}

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

function confirmCardDelete(evt) {
  const cardId = constants.confirmationPopup.dataset.cardId;
  deleteCard(cardId);
  closePopup(evt.target.closest(".popup"));
  constants.confirmationPopup.dataset.cardId = "";
}

function submitCardForm(evt) {
  const oldButtonLabel = changeButtonLabelOnForm(evt.target, "Сохранение...");
  saveCard(constants.cardLabelInput.value, constants.cardLinkInput.value);
  submitForm(evt);
  changeButtonLabelOnForm(evt.target, oldButtonLabel);
}

function submitProfileForm(evt) {
  const oldButtonLabel = changeButtonLabelOnForm(evt.target, "Сохранение...");
  updateProfile(
    constants.profileNameInput.value,
    constants.profileDescriptionInput.value
  );
  submitForm(evt);
  changeButtonLabelOnForm(evt.target, oldButtonLabel);
}

function submitAvatarFrom(evt) {
  const oldButtonLabel = changeButtonLabelOnForm(evt.target, "Сохранение...");
  updateAvatar(constants.avatarLinkInput.value);
  submitForm(evt);
  changeButtonLabelOnForm(evt.target, oldButtonLabel);
}

function openConfirmationPopup(evt) {
  console.log();
  constants.confirmationPopup.dataset.cardId =
    evt.target.closest(".card").dataset.cardId;
  openPopup(constants.confirmationPopup);
  constants.confirmationPopup
    .querySelector(".form__action-button")
    .addEventListener("click", confirmCardDelete);
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
  openConfirmationPopup,
  processClickOnPopup,
  submitCardForm,
  submitProfileForm,
  submitAvatarFrom,
};
