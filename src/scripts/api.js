import * as constants from "./constants.js";

const login = "plus-cohort-22";
const pword = "3BmSRqjRZYsE2r3pW6NrQ";
const emailAddress = "plus-cohort-22@ya.ru";
const token = "2d446760-eb73-474d-999b-cb7f739e396a";
const serverUrl = "https://mesto.nomoreparties.co";

function renderProfile(profile) {
  constants.profileName.textContent = profile.name;
  constants.profileDescription.textContent = profile.about;
  constants.profileAvatarImage.src = profile.avatar;
  constants.profileInfo.dataset.id = profile["_id"];
}

function loadProfile() {
  return sendRequest("/users/me")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((profile) => {
      renderProfile(profile);
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateProfile(name, description) {
  const requestData = {};
  if (name) {
    requestData["name"] = name;
  }
  if (description) {
    requestData["about"] = description;
  }
  return sendRequest("/users/me", "PATCH", requestData)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((profile) => {
      renderProfile(profile);
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateAvatar(avatarImageLink) {
  const requestData = {};
  if (avatarImageLink) {
    requestData["avatar"] = avatarImageLink;
  }
  return sendRequest("/users/me/avatar", "PATCH", requestData)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((profile) => {
      renderProfile(profile);
    })
    .catch((err) => {
      console.log(err);
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

export { loadProfile, sendRequest, updateProfile, updateAvatar };
