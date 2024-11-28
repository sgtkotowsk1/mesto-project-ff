import "./index.css";
import { createCard } from "./modules/cards.js";
import { openPopup, closePopup } from "./modules/modal.js";
import {
  getAllCards,
  getUserInfo,
  updateUserInfo,
  postCard,
  updateLikeStatus,
  deleteCard,
  updateUserAvatar,
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
    updateUserInfo(userName.value, userDescription.value);
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
        cardLike: result.likes,
        cardOwner: result.owner,
        currentUserId: result.owner["_id"],
        openImagePopup,
        handleRemoveCard,
        handleLikeClick,
        cardTemplate,
      });
      cardList.prepend(newCard);
    });
    closePopup();
  } catch (err) {
    console.error("Ошибка при открытии окна загрузки карточки:", err);
  }
};

Promise.all([getAllCards(), getUserInfo()])
  .then(([allCards, {name, about: description, avatar, _id: currentUserId}]) => {
    allCards.forEach((card) => {
      renderCard(card, {
        handleRemoveCard,
        openImagePopup,
        handleLikeClick,
        cardTemplate,
        cardList,
        currentUserId
      });
    });

    profileTitle.textContent = name;
    profileDesription.textContent = description;
    profileImage.style.backgroundImage = `url(${avatar})`;
    
  })
  .catch((err) => console.error("Ошибка загрузки данных", err));

const renderCard = (card, cardData) => {
  const {
    handleRemoveCard,
    openImagePopup,
    handleLikeClick,
    cardTemplate,
    cardList,
    currentUserId
  } = cardData;
  const cardElement = createCard({
    name: card.name,
    link: card.link,
    cardId: card._id,
    cardLike: card.likes,
    cardOwner: card.owner,
    handleRemoveCard,
    openImagePopup,
    handleLikeClick,
    cardTemplate,
    currentUserId
  });
  cardList.append(cardElement);
};


const openImagePopup = ({ name, link }) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImageContainer);
};

const handleLikeClick = async (evt, cardId, likeCountElement) => {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  try {
    const cardData = await updateLikeStatus(cardId, isLiked);
    likeButton.classList.toggle("card__like-button_is-active");
    likeCountElement.textContent = cardData.likes.length
    
  } catch (err) {
    console.error("Ошибка при выставлении лайка", err);
  }
};

const handleRemoveCard = async (cardId, cardElement) => {
   try {
    await deleteCard(cardId)
    cardElement.remove();
   }
   catch(err) {
    console.error("Ошибка загрузки данных", err);
   }
};




const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(settings);
