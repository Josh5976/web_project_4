const preview = document.querySelector(".popup_type_preview");
const previewPopupTitle = preview.querySelector(".popup__title");
const previewPopupImage = preview.querySelector(".popup__image");
const ESC_KEYCODE = 27;

const handleEsc = (evt) => {
    evt.preventDefault();

    const activePopup = document.querySelector('.popup_enabled');

    if (evt.which === ESC_KEYCODE) {
        closePopup(activePopup);
    }
}

const openPopup = (popup) => {
    popup.classList.add("popup_enabled");
    document.addEventListener('keydown', handleEsc);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_enabled');
    document.removeEventListener('keydown', handleEsc);
}


class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;

        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector)
        .content.querySelector(".card").cloneNode(true);
    }

    _handleLikeIcon() {
        this.classList.toggle("card__info-button_active");
    }

    _handleDeleteIcon() {
        this.parentElement.remove();
    }

    _handlePreviewImage() {
        previewPopupImage.src = this._link;
        console.log(this);
        previewPopupTitle.textContent = this._name;
        openPopup(preview);
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", this._handleLikeIcon);
        this._deleteButton.addEventListener("click", this._handleDeleteIcon);
        this._cardImage.addEventListener("click", ()=> this._handlePreviewImage(this));
    }

    generateCard() {
        this._template = this._getTemplate();
        this._likeButton = this._template.querySelector(".card__info-button");
        this._deleteButton = this._template.querySelector(".card__trash");
        this._cardImage = this._template.querySelector(".card__image");
        this._cardTitle = this._template.querySelector(".card__info-title");

        this._cardImage.src = this._link;
        this._cardTitle.textContent = this._name;

        this._setEventListeners();

        return this._template;
    }
}


export default Card;