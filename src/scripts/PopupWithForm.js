import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.form__info-input');
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
            this._handleFormSubmit(this._getInputValues());

            this.close();
        }, {once: true});
    }

    close() {
        super.close();
        this._form.reset();
    }
}