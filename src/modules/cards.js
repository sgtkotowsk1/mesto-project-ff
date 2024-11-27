const createCard = ({
  name,
  link,
  deleteCard,
  openImagePopup,
  handleLikeClick,
  cardTemplate,
  cardId,
  cardLikes
}) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".card__like-count")
  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.src = link;
  cardImageElement.alt = name;
  likeCountElement.textContent = cardLikes.length
  cardElement.querySelector(".card__title").textContent = name;

  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  likeButton.addEventListener("click", (evt) => handleLikeClick(evt, cardId, cardLikes, likeCountElement));

  cardImageElement.addEventListener("click", () => openImagePopup({ name, link })
  );

  return cardElement;
};

export { createCard };
