
const preview = document.querySelector(".popup_type_preview");
const previewPopupTitle = preview.querySelector(".popup__title");
const previewPopupImage = preview.querySelector(".popup__image");
const ESC_KEYCODE = 27;

class Card {
    constructor(data, cardSelector, handleCardClick) {
        this.handleCardClick = handleCardClick;
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
        this._template.remove();
        this._template = null;
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", this._handleLikeIcon);
        this._deleteButton.addEventListener("click", this._handleDeleteIcon.bind(this));
        this._cardImage.addEventListener("click", this.handleCardClick);
    }

    generateCard() {
        this._template = this._getTemplate();
        this._likeButton = this._template.querySelector(".card__info-button");
        this._deleteButton = this._template.querySelector(".card__trash");
        this._cardImage = this._template.querySelector(".card__image");

        this._template.querySelector(".card__info-title").textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = `A picture of ${this._name}`;
        this._setEventListeners();

        return this._template;
    }
}


export default Card;