export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAvatar = document.querySelector(".profile__avatar-box");
export const profileAvatarImage = document.querySelector(
  ".profile__avatar-image"
);
export const addNewCardButton = document.querySelector(
  ".profile__add-card-button"
);
export const imageContainer = document.querySelector(".elements");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const popups = document.querySelectorAll(".popup");
export const profilePopup = document.querySelector(".popup_type_edit-profile");
export const avatarPopup = document.querySelector(".popup_type_edit-avatar");
export const cardPopup = document.querySelector(".popup_type_add-card");
export const imagePopup = document.querySelector(".fullscreen-image");
export const fullscreenImagePicture = imagePopup.querySelector(
  ".fullscreen-image__picture"
);

export const fullscreenImageLabel = imagePopup.querySelector(
  ".fullscreen-image__label"
);
export const profileForm = document.forms["profile"];
export const profileNameInput = profileForm["name"];
export const profileDescriptionInput = profileForm["description"];
export const cardForm = document.forms["card"];
export const cardLabelInput = cardForm["label"];
export const cardLinkInput = cardForm["link"];
export const avatarForm = document.forms["avatar"];
export const avatarLinkInput = avatarForm["avatar-link"];
