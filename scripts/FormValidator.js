class FormValidator {
    constructor(settings, formElement) {
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._inputErrorClass = settings.inactiveErrosClass;
      this._errorClass = settings.errorClass;
      
      this._form = formElement
    };
  
    _showInputError(input) {
        const errorElement = this._form.querySelector('#' + input.id + '-error');
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
    }

    _hideInputError(input) {
        const errorElement = this._form.querySelector('#' + input.id + '-error');
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
        input.classList.remove(this._errorClass);
    }

    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideInputError(input);
        } else {
            this._showInputError(input);
        }
    }

    _checkIfAllInputsValid() {
        return this._inputList.every(input => input.validity.valid);
    }
    

    _toggleButton() {
        // check if all inputs are valid
        if(this._checkIfAllInputsValid()){
            this._submitButton.disabled = false;
            this._submitButton.classList.remove(this._inactiveButtonClass);
        } else {
            this._submitButton.disabled = true;
            this._submitButton.classList.add(this._inactiveButtonClass);
        }
    }

    _setEventListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._submitButton = this._form.querySelector(this._submitButtonSelector);
    // set button to disabled when first loading form
        this._toggleButton();
    // set event listeners for each input
        this._inputList.forEach((input) => {
            input.addEventListener('input', (evt) => {
                // check validity
                this._checkInputValidity(input);
                // toggle button
                this._toggleButton();
                
            })
        })
    };

    enableValidation () {
      this._form.addEventListener('submit', evt => evt.preventDefault());
      this._setEventListeners();
    };
};


export default FormValidator;