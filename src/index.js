import "./index.css";
import { createCard, deleteCard, likeCard } from "./modules/cards.js";
import {
  openPopup,
  closePopup,
  openImagePopup,
  handleFormSubmitEditForm,
  handleFormSubmitAddForm,
} from "./modules/modal.js";

import { initialCards } from "./modules/card.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");
const popupClose = document.querySelectorAll(".popup__close");
const addForm = document.forms["new-place"];
const editForm = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDesription = document.querySelector(".profile__description");
let userName = editForm.name;
let userDescription = editForm.description;

editForm.addEventListener("submit", (evt) =>
  handleFormSubmitEditForm(
    evt,
    editForm.name,
    editForm.description,
    profileTitle,
    profileDesription
  )
);
addForm.addEventListener("submit", (evt) =>
  handleFormSubmitAddForm(
    evt,
    addForm["place-name"],
    addForm.link,
    cardTemplate,
    cardList,
    addForm
  )
);

popupClose.forEach((element) => element.addEventListener("click", closePopup));

profileAddButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

editProfileButton.addEventListener("click", () => {
  openPopup(popupEdit);
  userName.value = profileTitle.textContent;
  userDescription.value = profileDesription.textContent;
});

initialCards.forEach((card) => {
  const cardElement = createCard(
    card,
    deleteCard,
    openImagePopup,
    likeCard,
    cardTemplate
  );
  cardList.append(cardElement);
});
