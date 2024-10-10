const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content

const createCard = (card, deleteCard) => {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImageElement = cardElement.querySelector('.card__image');

    cardImageElement.src = card.link
    cardImageElement.alt = card.name
    cardElement.querySelector('.card__title').textContent = card.name;

    deleteButton.addEventListener('click', () => deleteCard(cardElement));
   
    return cardElement
}

function deleteCard(card) {
    card.remove();
}

initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteCard)
    cardList.append(cardElement);
});