const createCard = ({
  name,
  link,
  handleRemoveCard,
  openImagePopup,
  handleLikeClick,
  cardTemplate,
  cardId,
  cardLike,
  cardOwner,
  currentUserId,
}) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  
  const likeCountElement = cardElement.querySelector(".card__like-count");
  const cardImageElement = cardElement.querySelector(".card__image");
  
  cardElement.setAttribute('card-id', cardId)
  cardImageElement.src = link;
  cardImageElement.alt = name;
  likeCountElement.textContent = cardLike.length;
  
  if (cardLike.find((userLike) => userLike._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active")
  }

  if (cardOwner._id === currentUserId) {
    deleteButton.classList.add('card__delete-button-is-active')
  }
  
  cardElement.querySelector(".card__title").textContent = name;

  deleteButton.addEventListener("click", () => handleRemoveCard(cardId, cardElement));

  likeButton.addEventListener("click", (evt) =>
    handleLikeClick(evt, cardId, likeCountElement)
  );

  cardImageElement.addEventListener("click", () =>
    openImagePopup({ name, link })
  );

  return cardElement;
};

export { createCard };
