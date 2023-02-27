const editProfileButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-card-button");
const closePopupButtonArray = document.querySelectorAll(".popup__close-button");

const imageContainer = document.querySelector(".elements");
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

editProfileButton.addEventListener("click", openEditProfileWindow);
addNewCardButton.addEventListener("click", openAddCardWindow);
closePopupButtonArray.forEach((element) => {
  element.addEventListener("click", closePopup);
});

renderPage();

function renderPage() {
  initialCards.forEach((item) => {
    addNewCard(item.link, item.name);
  });
}

function openEditProfileWindow() {
  const popup = document.querySelector(".popup_type_edit-profile");
  popup.classList.add("popup_opened");
  const mainPageName = document.querySelector(".profile__name").textContent;
  const mainPageDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  let popupName = popup.querySelector(".popup__input-item-name");
  popupName.value = mainPageName;
  let popupDescription = popup.querySelector(".popup__input-item-description");
  popupDescription.value = mainPageDescription;
  popup.addEventListener("submit", submitEditProfileWindow);
}

function submitEditProfileWindow(evt) {
  evt.preventDefault();
  const editProfilePopup = document.querySelector(".popup_type_edit-profile");
  const newName = editProfilePopup.querySelector(
    ".popup__input-item-name"
  ).value;
  const newDescription = editProfilePopup.querySelector(
    ".popup__input-item-description"
  ).value;
  document.querySelector(".profile__name").textContent = newName;
  document.querySelector(".profile__description").textContent = newDescription;

  closePopup();
}

function openAddCardWindow() {
  const popup = document.querySelector(".popup_type_add-card");
  popup.classList.add("popup_opened");

  popup.addEventListener("submit", submitAddCardWindow);
}

function addNewCard(source, label) {
  const cardTemplate = document.querySelector("#card-template").content;
  const newElement = cardTemplate.querySelector(".card").cloneNode(true);

  newElement.querySelector(".card__item-photo").src = source;
  newElement.querySelector(".card__item-photo").alt = label;
  newElement.querySelector(".card__item-label").textContent = label;

  newElement
    .querySelector(".card__delete-button")
    .addEventListener("click", pressDeleteButton);
  newElement
    .querySelector(".card__like-button")
    .addEventListener("click", pressLikeButton);
  newElement
    .querySelector(".card__item-photo")
    .addEventListener("click", pressCardImage);

  imageContainer.prepend(newElement);
}

function submitAddCardWindow(evt) {
  evt.preventDefault();
  const addCardPopup = document.querySelector(".popup_type_add-card");
  const providedImageSource = addCardPopup.querySelector(
    ".popup__input-item-link"
  ).value;
  const providedImageLabel = addCardPopup.querySelector(
    ".popup__input-item-card"
  ).value;

  addNewCard(providedImageSource, providedImageLabel);

  closePopup();
}

function closePopup() {
  const openedPopup = document.querySelector(".popup_opened");
  openedPopup.classList.remove("popup_opened");
}

function pressLikeButton(event) {
  event.target.classList.toggle("card__like-button_active");
}

function pressDeleteButton(event) {
  event.target.parentElement.remove();
}

function pressCardImage(event) {
  const popupPictureSrc = event.target.src;
  const popupPictureLabel =
    event.target.parentElement.querySelector(".card__item-label").textContent;

  const popup = document.querySelector(".fullscreen-image");
  popup.classList.add("popup_opened");

  popup.querySelector(".fullscreen-image__picture").src = popupPictureSrc;
  popup.querySelector(".fullscreen-image__picture").alt = popupPictureLabel;
  popup.querySelector(".fullscreen-image__label").textContent =
    popupPictureLabel;
}
