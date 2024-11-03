const openPopup = (popup) => {
  popup.classList.add("popup_is-animated");
  setTimeout(() => popup.classList.add("popup_is-opened"), 0);
  document.addEventListener("keyup", handleCloseByEscape);
  document.addEventListener("mousedown", handleCloseByOverlay);
};

const closePopup = () => {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    document;
    openedPopup.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", handleCloseByEscape);
    document.removeEventListener("mousedown", handleCloseByOverlay);
  }
};

const handleCloseByEscape = (evt) => {
  if (evt.key === "Escape") {
    closePopup();
  }
};

const handleCloseByOverlay = (evt) => {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup();
  }
};

export { openPopup, closePopup, handleCloseByEscape, handleCloseByOverlay };
