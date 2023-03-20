function processKeybord(event) {
  if (event.key == "Escape") {
    const openedPopups = document.querySelectorAll(".popup_opened");
    openedPopups.forEach(closePopup);
  }
}

function openPopup(popup) {
  document.addEventListener("keydown", processKeybord);
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", processKeybord);
}

export { openPopup, closePopup };
