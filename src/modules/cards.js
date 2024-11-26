const deleteCard = (cardElement) => cardElement.remove();






  


const createCard = ({
  name,
  link,
  deleteCard,
  openImagePopup,
  handleLikeClick,
  cardTemplate,
}) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  likeButton.addEventListener("click", handleLikeClick);

  cardImageElement.addEventListener("click", () => openImagePopup({ name, link })
  );

  return cardElement;
};

export { createCard, deleteCard };
