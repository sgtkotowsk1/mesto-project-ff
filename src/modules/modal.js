import { createCard, deleteCard, likeCard } from "./cards.js";

export const openPopup = (popup) => {
  popup.classList.add("popup_is-animated");
  setTimeout(() => popup.classList.add("popup_is-opened"), 0);
  document.addEventListener("keyup", handleCloseByEscape);
  document.addEventListener("mousedown", handleCloseByOverlay);
};

export const closePopup = () => {
  document
    .querySelector(".popup_is-opened")
    .classList.remove("popup_is-opened");
  setTimeout(
    () =>
      document
        .querySelector(".popup_is-animated")
        .classList.remove("popup_is-animated"),
    600
  );
};

export const handleCloseByEscape = (evt) => {
  if (evt.key === "Escape") {
    closePopup();
    document.removeEventListener("keyup", handleCloseByEscape);
  }
};

export const handleCloseByOverlay = (evt) => {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup();
    document.removeEventListener("mousedown", handleCloseByOverlay);
  }
};

export const openImagePopup = ({ name, link }) => {
  const popupImage = document.querySelector(".popup_type_image");
  document.addEventListener("keyup", handleCloseByEscape);
  document.addEventListener("mousedown", handleCloseByOverlay);
  const image = popupImage.querySelector(".popup__image");
  image.src = link;
  image.alt = name;
  popupImage.querySelector(".popup__caption").textContent = name;
  openPopup(popupImage);
};

export const handleFormSubmitEditForm = (
  evt,
  userName,
  userDescription,
  profileTitle,
  profileDesription
) => {
  evt.preventDefault();
  profileTitle.textContent = userName.value;
  profileDesription.textContent = userDescription.value;
  closePopup();
};

export const handleFormSubmitAddForm = (
  evt,
  placeName,
  placeLink,
  cardTemplate,
  cardList,
  addForm
) => {
  evt.preventDefault();
  const newCard = createCard(
    { name: placeName.value, link: placeLink.value },
    deleteCard,
    openImagePopup,
    likeCard,
    cardTemplate
  );
  cardList.prepend(newCard);
  addForm.reset();
  closePopup();
};
