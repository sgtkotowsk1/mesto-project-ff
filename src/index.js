import "./index.css";
import { createCard } from "./modules/cards.js";
import { openPopup, closePopup } from "./modules/modal.js";
import {
  getAllCards,
  getUserInfo,
  patchUserInfo,
  postCard,
  updateLikeStatus,
  deleteCard
} from "./modules/api.js";
import { clearValidation, enableValidation } from "./modules/validation.js";

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
const profileImage = document.querySelector(".profile__image");

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

const handleFormSubmitEditForm = async (evt) => {
  try {
    evt.preventDefault();
    profileTitle.textContent = userName.value;
    profileDesription.textContent = userDescription.value;
    patchUserInfo(userName.value, userDescription.value);
    closePopup();
  } catch (err) {
    console.error("Ошибка при открытии окна редактирования профиля", err);
  }
};

const handleFormSubmitAddForm = async (evt, placeName, placeLink) => {
  try {
    evt.preventDefault();
    postCard(placeName.value, placeLink.value).then((result) => {
      const newCard = createCard({
        name: result.name,
        link: result.link,
        cardId: result._id,
        cardLikes: result.likes,
        openImagePopup,
        deleteCard,
        handleLikeClick,
        cardTemplate,
        deleteCard,
      });
      cardList.prepend(newCard);
    });
    closePopup();
  } catch (err) {
    console.error("Ошибка при открытии окна загрузки карточки:", err);
  }
};

Promise.all([getAllCards(), getUserInfo()])
  .then(([allCards, userInfo]) => {
    allCards.forEach((card) => {
      renderCard(card, {
        deleteCard,
        openImagePopup,
        handleLikeClick,
        cardTemplate,
        cardList,
      });
    });

    profileTitle.textContent = userInfo.name;
    profileDesription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
  })
  .catch((err) => console.error("Ошибка загрузки данных", err));

const openImagePopup = ({ name, link }) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImageContainer);
};

const renderCard = (card, cardData) => {
  const {
    deleteCard,
    openImagePopup,
    handleLikeClick,
    cardTemplate,
    cardList,
  } = cardData;
  const cardElement = createCard({
    name: card.name,
    link: card.link,
    cardId: card._id,
    cardLikes: card.likes,
    deleteCard,
    openImagePopup,
    handleLikeClick,
    cardTemplate,
  });
  cardList.append(cardElement);
};

const handleLikeClick = async (evt, cardId, cardLikes, likeCountElement) => {
  const likeButton = evt.target;
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  likeButton.classList.toggle("card__like-button_is-active");
  try {
    await updateLikeStatus(cardId, isLiked);
    if (isLiked) {
      cardLikes.length--;
    } else {
      cardLikes.length++;
    }
    likeCountElement.textContent = cardLikes.length;
  } catch (err) {
    console.error("Ошибка при выставлении лайка");
    likeButton.classList.toggle("card__like-button_is-active");
  }
};

// const deleteCard = async (cardId) => {
//   await deleteCard(cardId)
// };

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(settings);
