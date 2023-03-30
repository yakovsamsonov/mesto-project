import * as constants from "./constants.js";
import { checkFormValidity } from "./validate.js";

function processKeybord(event) {
  if (event.key == "Escape") {
    const openedPopups = document.querySelectorAll(".popup_opened");
    openedPopups.forEach(closePopup);
  }
}

function openPopup(popup) {
  const formInPopup = popup.querySelector(".form");
  if (formInPopup) {
    checkFormValidity(formInPopup, constants.validationSettings);
  }
  document.addEventListener("keydown", processKeybord);
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", processKeybord);
}

function submitForm(evt) {
  const buttonElement = evt.target.querySelector(
    constants.validationSettings.submitButtonSelector
  );
  buttonElement.classList.add(constants.validationSettings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);

  evt.target.reset();
  closePopup(evt.target.closest(".popup"));
}

function openConfirmationPopup(evt) {
  constants.confirmationPopup.dataset.cardId =
    evt.target.closest(".card").dataset.cardId;
  openPopup(constants.confirmationPopup);
}

function openEditAvatarWindow() {
  openPopup(constants.avatarPopup);
}

function openEditProfileWindow() {
  constants.profileNameInput.value = constants.profileName.textContent;
  constants.profileDescriptionInput.value =
    constants.profileDescription.textContent;
  openPopup(constants.profilePopup);
}

function openAddCardWindow() {
  openPopup(constants.cardPopup);
}

function openCardImage(source, label) {
  constants.fullscreenImagePicture.src = source;
  constants.fullscreenImagePicture.alt = label;
  constants.fullscreenImageLabel.textContent = label;
  openPopup(constants.imagePopup);
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
  closePopup,
  openCardImage,
  openEditProfileWindow,
  openEditAvatarWindow,
  openAddCardWindow,
  openConfirmationPopup,
  processClickOnPopup,
  submitForm,
};
