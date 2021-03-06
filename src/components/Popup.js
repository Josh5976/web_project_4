export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add("popup_enabled");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup_enabled");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(evt) {
       // evt.preventDefault(); // does not work outside if statement
        if (evt.key === "Escape") {
            //evt.preventDefault(); would work
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if(evt.target.classList.contains("popup")){
                this.close();
            }
        });
        this._popup.querySelector(".popup__content-close")
        .addEventListener('click', ()=> this.close());
    }
}