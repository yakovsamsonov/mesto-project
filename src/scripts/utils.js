import * as constants from "./constants.js";
import { deleteCard, saveCard, updateAvatar, updateProfile } from "./api.js";
import { closePopup, submitForm } from "./modal.js";
import { renderCard } from "./card.js";
import { renderProfile } from "./profile.js";

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
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup(evt.target.closest(".popup"));
      constants.confirmationPopup.dataset.cardId = "";
    });
}

function submitCardForm(evt) {
  evt.preventDefault();
  const oldButtonLabel = changeButtonLabelOnPopup(evt.target, "Сохранение...");
  saveCard(constants.cardLabelInput.value, constants.cardLinkInput.value)
    .then((card) => {
      renderCard(constants.imageContainer, card);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitForm(evt);
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
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitForm(evt);
      changeButtonLabelOnPopup(evt.target, oldButtonLabel);
    });
}

function submitAvatarFrom(evt) {
  evt.preventDefault();
  const oldButtonLabel = changeButtonLabelOnPopup(evt.target, "Сохранение...");
  updateAvatar(constants.avatarLinkInput.value)
    .then((profile) => {
      renderProfile(profile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitForm(evt);
      changeButtonLabelOnPopup(evt.target, oldButtonLabel);
    });
}

export {
  confirmCardDelete,
  submitAvatarFrom,
  submitProfileForm,
  submitCardForm,
};
