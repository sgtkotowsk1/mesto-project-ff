export {createCard, deleteCard, initialCards, likeCard};

const cardTemplate = document.querySelector('#card-template').content;

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const createCard = (card, deleteCard, openImagePopup, likeCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button')
  const cardImageElement = cardElement.querySelector('.card__image');

  cardImageElement.src = card.link
  cardImageElement.alt = card.name
  cardElement.querySelector('.card__title').textContent = card.name;

  deleteButton.addEventListener('click', () =>  deleteCard(cardElement));
  
  likeButton.addEventListener('click', likeCard);

  cardImageElement.addEventListener('click', () => openImagePopup(card))
    
  return cardElement
}

const deleteCard = (card) => card.remove();
    
const likeCard = (evt) => evt.target.classList.toggle('card__like-button_is-active')


