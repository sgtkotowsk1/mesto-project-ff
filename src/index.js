import "./index.css";
import { createCard, deleteCard, likeCard } from "./modules/cards.js";
import { openPopup, closePopup } from "./modules/modal.js";
import { getAllCards, getUserInfo } from "./modules/api.js";
import {clearValidation, enableValidation} from "./modules/validation.js"


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
const profileImage = document.querySelector('.profile__image')

const userName = editForm.name;
const userDescription = editForm.description;

editForm.addEventListener("submit", (evt) => handleFormSubmitEditForm(evt));

addForm.addEventListener("submit", (evt) =>
  handleFormSubmitAddForm(evt, addForm["place-name"], addForm.link)
);

closePopups.forEach((element) => element.addEventListener("click", closePopup));






profileAddButton.addEventListener("click", () => {
  openPopup(popupNewCard);
  clearValidation(addForm, settings);
});

editProfileButton.addEventListener("click", () => {
  openPopup(popupEdit);
  clearValidation(editForm, settings);
  userName.value = profileTitle.textContent;
  userDescription.value = profileDesription.textContent;
});

const handleFormSubmitEditForm = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = userName.value;
  profileDesription.textContent = userDescription.value;
  closePopup();
};

const handleFormSubmitAddForm = (evt, placeName, placeLink) => {
  evt.preventDefault();
  const newCard = createCard({
    name: placeName.value,
    link: placeLink.value,
    openImagePopup,
    deleteCard,
    likeCard,
    cardTemplate,
  });
  cardList.prepend(newCard);
  closePopup();
  setTimeout(() => addForm.reset(), 600);
};

const openImagePopup = ({ name, link }) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImageContainer);
};

const renderCard = (card, cardData) => {
  const { deleteCard, openImagePopup, likeCard, cardTemplate, cardList } = cardData;

  const cardElement = createCard({
    name: card.name,
    link: card.link,
    deleteCard,
    openImagePopup,
    likeCard,
    cardTemplate,
  });

  cardList.append(cardElement);
};

getUserInfo().then((userInfo) => {
  profileTitle.textContent = userInfo.name
  profileDesription.textContent = userInfo.about
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
  const userId = userInfo._id
  console.log(userId);
});

getAllCards().then((cards) => {
  cards.forEach((card) => {
    renderCard(card, {
      deleteCard,
      openImagePopup,
      likeCard,
      cardTemplate,
      cardList,
    })
  });
}).catch((error) => {
  console.error("Ошибка загрузки карточек:", error);
});

// Promise.all([getAllCards(), getUserInfo()]).then(([allCards, userInfo]) => {
//   profileTitle.textContent = userInfo.name
//   profileDesription.textContent = userInfo.about
//   profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
//   const userId = userInfo._id
//   console.log(userId);
// })

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(settings);
