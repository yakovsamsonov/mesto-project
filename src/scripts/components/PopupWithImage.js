import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector(".fullscreen-image__picture");
    this._label = this._popup.querySelector(".fullscreen-image__label");
  }

  open(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._label.textContent = name;
    super.open();
  }
}
