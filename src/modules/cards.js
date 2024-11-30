import { updateLikeStatus, deleteCard } from "./api";

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

const createCard = (cardData) => {
  const {
    name,
    link,
    openImagePopup,
    cardTemplate,
    cardId,
    cardLikes,
    cardOwner,
    currentUserId,
  } = cardData;

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  const likeCountElement = cardElement.querySelector(".card__like-count");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardElement.setAttribute("card-id", cardId);
  cardImageElement.src = link;
  cardImageElement.alt = name;
  likeCountElement.textContent = cardLikes.length;

  if (cardLikes.find((userLike) => userLike._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (cardOwner._id === currentUserId) {
    deleteButton.classList.add("card__delete-button-is-active");
  }

  cardElement.querySelector(".card__title").textContent = name;

  deleteButton.addEventListener("click", () =>
    handleRemoveCard(cardId, cardElement)
  );

  likeButton.addEventListener("click", (evt) =>
    handleLikeClick(evt, cardId, likeCountElement)
  );

  cardImageElement.addEventListener("click", () =>
    openImagePopup({ name, link })
  );

  return cardElement;
};

export { createCard, handleLikeClick, handleRemoveCard };
