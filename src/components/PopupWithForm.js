import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._form.querySelectorAll('.form__info-input');
        this._submitButton = this._form.querySelector(".form__info-button");
        this._submitButtonText = this._submitButton.value;
    }

    _getInputValues() {
        this._data = {};
        this._inputList.forEach(input => {
            this._data[input.name] = input.value;
        });
        
        return this._data;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitButton.value = "Saving...";
            this._handleFormSubmit(this._getInputValues());

            this.close();
            //submitButton.value = submitButtonText;
        });
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    open() {
        super.open();
        this._submitButton.value = this._submitButtonText;
    }

}