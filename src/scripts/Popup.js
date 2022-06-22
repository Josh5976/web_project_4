export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add("popup_enabled");
        document.addEventListener("keydown", this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove("popup_enabled");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            evt.preventDefault();
            this.close();
        }
    }

    setEventListeners() {
        document.addEventListener('mousedown', (evt) => {
            if(evt.target.classList.contains("popup")){
                this.close();
            }
        });
    }
}