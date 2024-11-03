import "./index.css";
import { createCard, deleteCard, likeCard } from "./modules/cards.js";
import { openPopup, closePopup } from "./modules/modal.js";
import { initialCards } from "./modules/card.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");
const closePopups = document.querySelectorAll(".popup__close");
const popupImageContainer = document.querySelector(".popup_type_image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");
const addForm = document.forms["new-place"];
const editForm = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDesription = document.querySelector(".profile__description");
const userName = editForm.name;
const userDescription = editForm.description;

editForm.addEventListener("submit", (evt) => handleFormSubmitEditForm(evt));

addForm.addEventListener("submit", (evt) =>
  handleFormSubmitAddForm(evt, addForm["place-name"], addForm.link)
);

closePopups.forEach((element) => element.addEventListener("click", closePopup));

profileAddButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

editProfileButton.addEventListener("click", () => {
  openPopup(popupEdit);
  userName.value = profileTitle.textContent;
  userDescription.value = profileDesription.textContent;
});

const openImagePopup = ({ name, link }) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImageContainer);
};

const handleFormSubmitEditForm = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = userName.value;
  profileDesription.textContent = userDescription.value;
  closePopup();
};

const handleFormSubmitAddForm = (evt, placeName, placeLink) => {
  evt.preventDefault();
  const newCard = createCard(
    { name: placeName.value, link: placeLink.value },
    deleteCard,
    openImagePopup,
    likeCard,
    cardTemplate
  );
  cardList.prepend(newCard);
  closePopup();
  setTimeout(() => addForm.reset(), 600);
};

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
