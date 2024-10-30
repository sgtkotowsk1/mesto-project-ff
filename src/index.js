import './index.css';
import {createCard, deleteCard, initialCards} from './modules/cards.js'
import {openPopup, closePopup, checkEscape, checkClickOut, openImagePopup} from './modules/modal.js'

const cardList = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');

const popupClose = document.querySelectorAll('.popup__close');

profileAddButton.addEventListener('click', () => {
    document.addEventListener('keyup', checkEscape);
    openPopup(popupNewCard);
});
editProfileButton.addEventListener('click', () => {
    document.addEventListener('keyup', checkEscape);
    openPopup(popupEdit)
});

document.addEventListener('click', () => {
    document.addEventListener('click', checkClickOut)
})


popupClose.forEach((element) => element.addEventListener('click', closePopup));

initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteCard, openImagePopup)
    cardList.append(cardElement);
});



