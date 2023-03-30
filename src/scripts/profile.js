import * as constants from "./constants.js";

function renderProfile(profile) {
  constants.profileName.textContent = profile.name;
  constants.profileDescription.textContent = profile.about;
  constants.profileAvatarImage.src = profile.avatar;
  constants.profileInfo.dataset.id = profile["_id"];
}

export { renderProfile };
