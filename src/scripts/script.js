const editProfileButton = document.querySelector(".profile__edit-button");
const profileAvatar = document.querySelector(".profile__avatar-box");
const profileAvatarImage = document.querySelector(".profile__avatar-image");
const addNewCardButton = document.querySelector(".profile__add-card-button");
const imageContainer = document.querySelector(".elements");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popups = document.querySelectorAll(".popup");
const profilePopup = document.querySelector(".popup_type_edit-profile");
const avatarPopup = document.querySelector(".popup_type_edit-avatar");
const cardPopup = document.querySelector(".popup_type_add-card");
const imagePopup = document.querySelector(".fullscreen-image");
const fullscreenImagePicture = imagePopup.querySelector(
  ".fullscreen-image__picture"
);

const fullscreenImageLabel = imagePopup.querySelector(
  ".fullscreen-image__label"
);
const profileForm = document.forms["profile"];
const profileNameInput = profileForm["name"];
const profileDescriptionInput = profileForm["description"];
const cardForm = document.forms["card"];
const cardLabelInput = cardForm["label"];
const cardLinkInput = cardForm["link"];
const avatarForm = document.forms["avatar"];
const avatarLinkInput = avatarForm["avatar-link"];

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

renderPage();

enableValidation({
  formSelector: ".form",
  fieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__action-button",
  inactiveButtonClass: "form__action-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible",
});

function renderPage() {
  document.addEventListener("keydown", processKeybord);

  editProfileButton.addEventListener("click", openEditProfileWindow);
  profileAvatar.addEventListener("click", openEditAvatarWindow);
  addNewCardButton.addEventListener("click", openAddCardWindow);
  initialCards.forEach((item) => {
    addNewCard(item.link, item.name);
  });
  popups.forEach((popup) => {
    popup.addEventListener("click", processClickOnPopup);
  });
  profileForm.addEventListener("submit", submitEditProfileWindow);
  avatarForm.addEventListener("submit", submitEditAvatarWindow);
  cardForm.addEventListener("submit", submitAddCardWindow);
}

function processKeybord(event) {
  if (event.keyCode == 27) {
    const openedPopups = document.querySelectorAll(".popup_opened");
    openedPopups.forEach((el) => {
      closePopup(el);
    });
  }
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

function openEditAvatarWindow() {
  openPopup(avatarPopup);
}

function submitEditAvatarWindow(evt) {
  evt.preventDefault();

  profileAvatarImage.src = avatarLinkInput.value;

  closePopup(avatarPopup);
  evt.target.reset();
}

function openEditProfileWindow() {
  openPopup(profilePopup);

  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openAddCardWindow() {
  openPopup(cardPopup);
}

function createCard(source, label) {
  const cardTemplate = document.querySelector("#card-template").content;
  const newElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardItemPhoto = newElement.querySelector(".card__item-photo");
  const cardItemLabel = newElement.querySelector(".card__item-label");

  cardItemPhoto.src = source;
  cardItemPhoto.alt = label;
  cardItemLabel.textContent = label;

  newElement
    .querySelector(".card__delete-button")
    .addEventListener("click", pressDeleteButton);
  newElement
    .querySelector(".card__like-button")
    .addEventListener("click", pressLikeButton);
  newElement
    .querySelector(".card__item-photo")
    .addEventListener("click", () => pressCardImage(source, label));
  return newElement;
}

function addNewCard(source, label) {
  const newElement = createCard(source, label);
  imageContainer.prepend(newElement);
}

function submitForm(evt) {
  evt.preventDefault();

  if (evt.target.id === "card") {
    addNewCard(cardLinkInput.value, cardLabelInput.value);
  } else if (evt.target.id == "profile") {
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
  }

  closePopup(evt.target.closest(".popup"));
}

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

function pressLikeButton(event) {
  event.target.classList.toggle("card__like-button_active");
}

function pressDeleteButton(event) {
  event.target.closest(".card").remove();
}

function pressCardImage(source, label) {
  openPopup(imagePopup);

  fullscreenImagePicture.src = source;
  fullscreenImagePicture.alt = label;
  fullscreenImageLabel.textContent = label;
}

function enableValidation(validation) {
  const formList = Array.from(
    document.querySelectorAll(validation.formSelector)
  );
  formList.forEach((form) => {
    form.addEventListener("submit", submitForm);
    const fieldsetList = Array.from(
      form.querySelectorAll(validation.fieldsetSelector)
    );
    fieldsetList.forEach((fieldset) => {
      setFildsetListeners(fieldset, validation);
    });
  });
}

function setFildsetListeners(fieldset, validation) {
  const inputList = Array.from(
    fieldset.querySelectorAll(validation.inputSelector)
  );
  const submitButton = fieldset.querySelector(validation.submitButtonSelector);
  toggleButtonState(submitButton, inputList, validation);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(fieldset, input, validation);
      toggleButtonState(submitButton, inputList, validation);
    });
  });
}

function toggleButtonState(buttonElement, inputList, validation) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validation.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validation.inactiveButtonClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function checkInputValidity(fieldset, input, validation) {
  if (input.validity.valid) {
    hideInputError(fieldset, input, validation);
  } else {
    showInputError(fieldset, input, input.validationMessage, validation);
  }
}

function hideInputError(fieldset, input, validation) {
  const errorElement = fieldset.querySelector(`.${input.id}-error`);
  input.classList.remove(validation.inputErrorClass);
  errorElement.classList.remove(validation.errorClass);
  errorElement.textContent = "";
}

function showInputError(fieldset, input, errorMessage, validation) {
  const errorElement = fieldset.querySelector(`.${input.id}-error`);
  input.classList.add(validation.inputErrorClass);
  errorElement.classList.add(validation.errorClass);
  errorElement.textContent = errorMessage;
}
