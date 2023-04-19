export default class UserInfo {
  constructor(
    { nameSelector, descriptionSelector, avatarSelector },
    { loadProfile, updateProfile, updateAvatar }
  ) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._loadProfile = loadProfile;
    this._updateProfile = updateProfile;
    this._updateAvatar = updateAvatar;
  }

  get userId() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get about() {
    return this._about;
  }

  get avatar() {
    return this._avatar;
  }

  _refreshProfile({ _id, name, about, avatar }) {
    this._id = _id || this._id;
    this._name = name || this.name;
    this._about = about || this.about;
    this._avatar = avatar || this.avatar;
  }

  renderProfile() {
    this._nameElement.textContent = this._name;
    this._descriptionElement.textContent = this._about;
    this._avatarElement.src = this._avatar;
  }

  setupProfile(profile) {
    this._refreshProfile(profile);
  }

  setUserInfo({ name, about, avatar }) {
    if (name && about) {
      return this._updateProfile(name, about)
        .then((profile) => {
          this._refreshProfile(profile);
          this.renderProfile();
        })
        .catch((err) => console.log(err));
    } else if (avatar) {
      return this._updateAvatar(avatar)
        .then((profile) => {
          this._refreshProfile(profile);
          this.renderProfile();
        })
        .catch((err) => console.log(err));
    } else {
      throw new Error("Unsupported function call");
    }
  }

  getUserInfo() {
    return this._loadProfile().then((profile) => this._refreshProfile(profile));
  }
}
