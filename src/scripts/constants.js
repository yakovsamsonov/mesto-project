export const profileAvatar = document.querySelector(".profile__avatar-box");

export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const addNewCardButton = document.querySelector(
  ".profile__add-card-button"
);

const profileForm = document.forms["profile"];
export const profileNameInput = profileForm["name"];
export const profileDescriptionInput = profileForm["description"];

export const validationSettings = {
  formSelector: ".form",
  fieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__action-button",
  inactiveButtonClass: "form__action-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible",
};
