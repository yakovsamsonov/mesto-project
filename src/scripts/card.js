import * as constants from "./constants.js";
import { openCardImage, openConfirmationPopup } from "./modal.js";
import { sendRequest } from "./api.js";

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

function renderCard(card) {
  const newElement = createCard(card);
  constants.imageContainer.prepend(newElement);
}

function pressLikeButton(event) {
  const cardElement = event.target.closest(".card");
  let method;
  if (event.target.classList.contains("card__like-button_active")) {
    method = "DELETE";
  } else {
    method = "PUT";
  }

  sendRequest(`/cards/likes/${cardElement.dataset.cardId}`, method)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((card) => {
      toggleLikeButton(cardElement, card.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteCard(cardId) {
  sendRequest(`/cards/${cardId}`, "DELETE")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(() => {
      constants.imageContainer.childNodes.forEach((card) => {
        if (cardId === card.dataset.cardId) {
          card.remove();
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadCards() {
  sendRequest("/cards")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((cards) => {
      cards.forEach((item) => {
        renderCard(item);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function saveCard(name, link) {
  const requestData = {};
  if (name) {
    requestData["name"] = name;
  }
  if (link) {
    requestData["link"] = link;
  }
  sendRequest("/cards", "POST", requestData)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((card) => {
      renderCard(card);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createCard, saveCard, loadCards, deleteCard, pressLikeButton };
