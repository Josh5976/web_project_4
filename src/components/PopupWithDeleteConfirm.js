import Popup from "./Popup.js";

export default class PopupWithDeleteConfirm extends Popup {
    constructor(popupSelector, handleClick) {
        super(popupSelector);
        this._handleButtonClick = handleClick;
        this._button = document.querySelector(".form__info-button_type_delete");
    }

    open(card) {
        super.open();
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener("click", () => {
            this._handleButtonClick(this._card);
            this.close();
        })
    }
}