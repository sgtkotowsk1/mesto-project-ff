const popupImage = document.querySelector('.popup_type_image');


export const openPopup = (popup) => popup.classList.add('popup_is-opened', 'popup_is-animated')

export const closePopup = () => {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened', 'popup_is-animated')
}

export const handleCloseByEscape = (evt) => {
    if (evt.key === "Escape") {
        closePopup();
        document.removeEventListener('keyup', handleCloseByEscape)
    }
}

export const handleCloseByOverlay = (evt) => {

    if (evt.target.classList.contains('popup_is-opened')) {
        closePopup();
        document.removeEventListener('click', handleCloseByOverlay)
    }
}

export const openImagePopup = (card) => {
    document.addEventListener('keyup', handleCloseByEscape);    
    document.addEventListener('click', handleCloseByOverlay);
    const image = popupImage.querySelector('.popup__image');
    image.src = card.link
    image.alt = card.name
    popupImage.querySelector('.popup__caption').textContent = card.name
    openPopup(popupImage)
}



