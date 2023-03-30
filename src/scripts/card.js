import * as constants from "./constants.js";
import { openCardImage, openConfirmationPopup } from "./modal.js";
import { saveLike } from "./api.js";

function hasMyLike(likes) {
  return likes.some((like) => {
    return like["_id"] === constants.profileInfo.dataset.id;
  });
}

function toggleLikeButton(card, likes) {
  const likeButton = card.querySelector(".card__like-button");
  if (hasMyLike(likes)) {
    likeButton.classList.add("card__like-button_active");
  } else {
    likeButton.classList.remove("card__like-button_active");
  }
  likeButton.dataset.likesCount = likes.length;
}

function createCard(card) {
  const cardTemplate = document.querySelector("#card-template").content;
  const newElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardItemPhoto = newElement.querySelector(".card__item-photo");
  const cardItemLabel = newElement.querySelector(".card__item-label");
  const deleteButton = newElement.querySelector(".card__delete-button");
  const likeButton = newElement.querySelector(".card__like-button");
  newElement.dataset.cardId = card["_id"];

  if (constants.profileInfo.dataset.id !== card.owner["_id"]) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", openConfirmationPopup);
  }

  cardItemPhoto.src = card.link;
  cardItemPhoto.alt = card.name;
  cardItemLabel.textContent = card.name;

  toggleLikeButton(newElement, card.likes);

  likeButton.addEventListener("click", pressLikeButton);
  cardItemPhoto.addEventListener("click", () =>
    openCardImage(card.link, card.name)
  );
  return newElement;
}

function renderCard(container, card) {
  const newElement = createCard(card);
  container.prepend(newElement);
}

function pressLikeButton(event) {
  const cardElement = event.target.closest(".card");

  saveLike(
    cardElement.dataset.cardId,
    event.target.classList.contains("card__like-button_active")
  )
    .then((card) => {
      toggleLikeButton(cardElement, card.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { renderCard };
