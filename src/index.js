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
  checkImageValidity,
} from "./modules/api.js";
import { clearValidation, enableValidation } from "./modules/validation.js";

const loaderText = "Сохранение...";
const saveText = "Сохранить";

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");

const popupAvatar = document.querySelector(".popup_type_new-avatar");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

const profileAddButton = document.querySelector(".profile__add-button");
const profileImageButton = document.querySelector(".profile__image");

const closePopups = document.querySelectorAll(".popup__close");
const popupImageContainer = document.querySelector(".popup_type_image");
const popupImageCaption = document.querySelector(".popup__caption");

const popupImage = document.querySelector(".popup__image");
const addForm = document.forms["new-place"];
const editForm = document.forms["edit-profile"];
const avatarForm = document.forms["new-avatar"];

const profileTitle = document.querySelector(".profile__title");
const profileDesription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const userName = editForm.name;
const userDescription = editForm.description;
const userAvatar = avatarForm["avatar-link"];

avatarForm.addEventListener("submit", async (evt) => {
  const popupSaveButton = avatarForm.querySelector(".popup__button");
  popupSaveButton.textContent = loaderText;

  try {
    await handleFormSubmitAvatar(evt);
    closePopup();
  } finally {
    popupSaveButton.textContent = saveText;
  }
});

editForm.addEventListener("submit", async (evt) => {
  const popupSaveButton = editForm.querySelector(".popup__button");
  popupSaveButton.textContent = loaderText;

  try {
    await handleFormSubmitEditForm(evt);
    closePopup();
  } catch (error) {
    console.error("Ошибка при отправке формы:", error);
  } finally {
    popupSaveButton.textContent = saveText;
  }
});

addForm.addEventListener("submit", async (evt) => {
  const popupSaveButton = addForm.querySelector(".popup__button");
  popupSaveButton.textContent = loaderText;

  try {
    await handleFormSubmitAddForm(evt, addForm["place-name"], addForm.link);
    closePopup();
  } catch (error) {
    console.error("Ошибка при отправке формы:", error);
  } finally {
    popupSaveButton.textContent = saveText;
  }
});

profileImageButton.addEventListener("click", () => {
  clearValidation(avatarForm, settings);
  openPopup(popupAvatar);
});

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
  evt.preventDefault();
  try {
    await updateUserInfo(userName.value, userDescription.value);
    profileTitle.textContent = userName.value;
    profileDesription.textContent = userDescription.value;
    closePopup();
  } catch (err) {
    console.error("Ошибка при открытии окна редактирования профиля", err);
  }
};

const handleFormSubmitAvatar = async (evt) => {
  evt.preventDefault();
  try {
    const result = await checkImageValidity(userAvatar.value);
    if (result) {
      await updateUserAvatar(userAvatar.value);
      profileImage.style.backgroundImage = `url(${userAvatar.value})`;
      closePopup();
    } else {
      throw new Error('"По указанному URL не найдено изображение"');
    }
  } catch (err) {
    console.error("Ошибка при загрузке аватарки", err);
    throw err;
  }
};

const handleFormSubmitAddForm = async (evt, placeName, placeLink) => {
  evt.preventDefault();
  try {
    await postCard(placeName.value, placeLink.value).then((result) => {
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
  } catch (err) {
    console.error("Ошибка при открытии окна загрузки карточки:", err);
  }
};

Promise.all([getAllCards(), getUserInfo()])
  .then(
    ([allCards, { name, about: description, avatar, _id: currentUserId }]) => {
      allCards.forEach((card) => {
        renderCard(card, {
          handleRemoveCard,
          openImagePopup,
          handleLikeClick,
          cardTemplate,
          cardList,
          currentUserId,
        });
      });

      profileTitle.textContent = name;
      profileDesription.textContent = description;
      profileImage.style.backgroundImage = `url(${avatar})`;
    }
  )
  .catch((err) => console.error("Ошибка загрузки данных", err));

const renderCard = (card, cardData) => {
  const {
    handleRemoveCard,
    openImagePopup,
    handleLikeClick,
    cardTemplate,
    cardList,
    currentUserId,
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
    currentUserId,
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
    likeCountElement.textContent = cardData.likes.length;
  } catch (err) {
    console.error("Ошибка при выставлении лайка", err);
  }
};

const handleRemoveCard = async (cardId, cardElement) => {
  try {
    await deleteCard(cardId);
    cardElement.remove();
  } catch (err) {
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
