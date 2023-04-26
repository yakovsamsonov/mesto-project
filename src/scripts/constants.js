export const profileAvatar = document.querySelector(".profile__avatar-box");

export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const addNewCardButton = document.querySelector(
  ".profile__add-card-button"
);

export const profileForm = document.forms["profile"];
export const changeAvatarForm = document.forms["avatar"];
export const cardAddForm = document.forms["card"];

export const validationSettings = {
  formSelector: ".form",
  fieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__action-button",
  inactiveButtonClass: "form__action-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible",
};

export const apiconfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: '2d446760-eb73-474d-999b-cb7f739e396a',
    'Content-Type': 'application/json'
  },
  id: "3BmSRqjRZYsE2r3pW6NrQ",
  emailAddress: "plus-cohort-22@ya.ru"
};
