const editProfileButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-card-button");
const imageContainer = document.querySelector(".elements");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profilePopup = document.querySelector(".popup_type_edit-profile");
const cardPopup = document.querySelector(".popup_type_add-card");
const imagePopup = document.querySelector(".fullscreen-image");
const fullscreenImagePicture = imagePopup.querySelector(
  ".fullscreen-image__picture"
);

const fullscreenImageLabel = imagePopup.querySelector(
  ".fullscreen-image__label"
);
const closeButtons = document.querySelectorAll(".popup__close-button");
const profileForm = document.forms["profile"];
const profileNameInput = profileForm["name"];
const profileDescriptionInput = profileForm["description"];
const cardForm = document.forms["card"];
const cardLabelInput = cardForm["label"];
const cardLinkInput = cardForm["link"];

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

function renderPage() {
  editProfileButton.addEventListener("click", openEditProfileWindow);
  addNewCardButton.addEventListener("click", openAddCardWindow);
  initialCards.forEach((item) => {
    addNewCard(item.link, item.name);
  });
  closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
  });
  profileForm.addEventListener("submit", submitEditProfileWindow);
  cardForm.addEventListener("submit", submitAddCardWindow);
}

function openEditProfileWindow() {
  openPopup(profilePopup);

  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function submitEditProfileWindow(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup(profilePopup);
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

function submitAddCardWindow(evt) {
  evt.preventDefault();

  addNewCard(cardLinkInput.value, cardLabelInput.value);
  closePopup(cardPopup);
  evt.target.reset();
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
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
