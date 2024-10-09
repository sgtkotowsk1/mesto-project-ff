const cardList = document.querySelector('.places__list');

const createCard = (card) => {
    const cardTemplate = document.querySelector('#card-template').content
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').setAttribute('src', card.link);
    cardElement.querySelector('.card__title').textContent = card.name;

    cardList.append(cardElement);
    
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
}

const deleteCard = (card) => {
    card.remove();
}

initialCards.forEach((card) => {
    createCard(card);
});






























    



