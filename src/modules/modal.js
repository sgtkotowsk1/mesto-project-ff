export const openPopup = (popup) => popup.classList.add('popup_is-opened', 'popup_is-animated')

export const closePopup = (evt) => {
    evt.target.closest('.popup').classList.remove('popup_is-opened', 'popup_is-animated')
}

export const closeModal = () => {
    
}


