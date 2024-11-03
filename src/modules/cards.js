const deleteCard = (evt) => evt.remove();

const likeCard = (evt) =>
  evt.target.classList.toggle("card__like-button_is-active");

const createCard = (
  { name, link },
  deleteCard,
  openImagePopup,
  likeCard,
  cardTemplate
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  likeButton.addEventListener("click", likeCard);

  cardImageElement.addEventListener("click", () =>
    openImagePopup({ name, link })
  );

  return cardElement;
};

export { createCard, deleteCard, likeCard };
