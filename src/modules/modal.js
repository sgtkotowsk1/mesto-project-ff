const popupImage = document.querySelector('.popup_type_image');

export const openPopup = (popup) => popup.classList.add('popup_is-opened', 'popup_is-animated')

export const closePopup = () => {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened', 'popup_is-animated')
}

export const checkEscape = (evt) => {
    if (evt.key === "Escape") {
        closePopup();
        document.removeEventListener('keyup', checkEscape)
    }
}

export const checkClickOut = (evt) => {
    if (evt.target.closest('.popup_is-opened')) {
        closePopup();
        document.removeEventListener('click', checkClickOut)
    }
}

export const openImagePopup = (card) => {
    document.addEventListener('keyup', checkEscape);
    const image = popupImage.querySelector('.popup__image');
    image.src = card.link
    image.alt = card.name
    popupImage.querySelector('.popup__caption').textContent = card.name
    openPopup(popupImage)
}



