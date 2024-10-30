import './index.css';
import {createCard, deleteCard, initialCards} from './modules/cards.js'
import {openPopup, closePopup} from './modules/modal.js'

const cardList = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');

const popupClose = document.querySelectorAll('.popup__close');

profileAddButton.addEventListener('click', () => openPopup(popupNewCard));
editProfileButton.addEventListener('click', () => openPopup(popupEdit));

document.addEventListener('keyup', evt => {
    if (evt.key === "Escape") {
        closePopup();
    }
})


popupClose.forEach((element) => element.addEventListener('click', closePopup));

initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteCard)
    cardList.append(cardElement);
});



