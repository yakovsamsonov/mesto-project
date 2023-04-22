export const profileAvatar = document.querySelector(".profile__avatar-box");

export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const addNewCardButton = document.querySelector(
  ".profile__add-card-button"
);

export const profilePopup = document.querySelector(".popup_type_edit-profile");
export const cardPopup = document.querySelector(".popup_type_add-card");
export const avatarPopup = document.querySelector(".popup_type_edit-avatar");
export const confirmationPopup = document.querySelector(
  ".popup_type_confirm-delete"
);

export const profileForm = document.forms["profile"];
export const profileNameInput = profileForm["name"];
export const profileDescriptionInput = profileForm["description"];
export const cardForm = document.forms["card"];
export const cardLabelInput = cardForm["label"];
export const cardLinkInput = cardForm["link"];
export const avatarForm = document.forms["avatar"];
export const avatarLinkInput = avatarForm["avatar-link"];

export const validationSettings = {
  formSelector: ".form",
  fieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__action-button",
  inactiveButtonClass: "form__action-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible",
};
