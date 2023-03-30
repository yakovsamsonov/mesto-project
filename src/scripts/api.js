const login = "plus-cohort-22";
const pword = "3BmSRqjRZYsE2r3pW6NrQ";
const emailAddress = "plus-cohort-22@ya.ru";
const token = "2d446760-eb73-474d-999b-cb7f739e396a";
const serverUrl = "https://mesto.nomoreparties.co";

function loadProfile() {
  return processRequest("/users/me");
}

function updateProfile(name, description) {
  const requestData = {};
  if (name) {
    requestData["name"] = name;
  }
  if (description) {
    requestData["about"] = description;
  }
  return processRequest("/users/me", "PATCH", requestData);
}

function updateAvatar(avatarImageLink) {
  const requestData = {};
  if (avatarImageLink) {
    requestData["avatar"] = avatarImageLink;
  }
  return processRequest("/users/me/avatar", "PATCH", requestData);
}

function deleteCard(cardId) {
  return processRequest(`/cards/${cardId}`, "DELETE");
}

function loadCards() {
  return processRequest("/cards");
}

function saveCard(name, link) {
  const requestData = {};
  if (name) {
    requestData["name"] = name;
  }
  if (link) {
    requestData["link"] = link;
  }
  return processRequest("/cards", "POST", requestData);
}

function saveLike(id, isDelete) {
  const method = isDelete ? "DELETE" : "PUT";
  return processRequest(`/cards/likes/${id}`, method);
}

function processRequest(endpoint, requestType, data) {
  return sendRequest(endpoint, requestType, data).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function sendRequest(endpoint, requestType, data) {
  const request = {
    method: requestType ? requestType : "GET",
    headers: {
      authorization: token,
    },
  };
  if (data) {
    request["body"] = JSON.stringify(data);
  }
  if (["PATCH", "POST"].includes(requestType)) {
    request["headers"]["Content-Type"] = "application/json";
  }
  return fetch(`${serverUrl}/v1/${login}${endpoint}`, request);
}

export {
  processRequest,
  loadProfile,
  updateAvatar,
  updateProfile,
  deleteCard,
  loadCards,
  saveCard,
  saveLike,
};
