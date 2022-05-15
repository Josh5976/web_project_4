// displays the input error
const showInputError = (input, formElement, settings) => {
    const errorSpan = formElement.querySelector('#' + input.id + '-error');
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(settings.errorClass);
    input.classList.add(settings.inputErrorClass);
}
// hides the input error
const hideInputError = (input, formElement, settings) => {
    const errorSpan = formElement.querySelector('#' + input.id + '-error');
    errorSpan.textContent = '';
    errorSpan.classList.remove(settings.errorClass);
    input.classList.remove(settings.inputErrorClass);
    
}
// checks input validity for each input to see if it needs an error message
const checkInputValidity = (formElement, input, settings) => {
    if (input.validity.valid) {
        hideInputError(input, formElement, settings);
    } else {
        showInputError(input, formElement, settings);
    }
}
// checks to see if both inputs are valid to turn on button
const hasValidInputs = (inputList) => {
    return inputList.every(input => input.validity.valid);
}

const toggleButton = (inputList, button, settings) => {
    // check if all inputs are valid
    if(hasValidInputs(inputList)){
        button.disabled = false;
        button.classList.remove(settings.inactiveButtonClass);
    } else {
        button.disabled = true;
        button.classList.add(settings.inactiveButtonClass);
    }

}

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const submitButton = formElement.querySelector(settings.submitButtonSelector);
    // set button to disabled when first loading form
    toggleButton(inputList, submitButton, settings);
    // set event listeners for each input
    inputList.forEach((input) => {
        input.addEventListener('input', (evt) => {
            // check validity
            checkInputValidity(formElement, input, settings);
            // toggle button
            toggleButton(inputList, submitButton, settings);
        })
    })
}

const enableValidation = (settings) => {
    const formElements = Array.from(document.querySelectorAll(settings.formSelector));
    // prevents default for each form element and sets the event listeners
    formElements.forEach((formElement) => {
        formElement.addEventListener('submit', evt => evt.preventDefault());
        setEventListeners(formElement, settings);
    })
    
}

enableValidation({
    formSelector: ".form",
    inputSelector: ".form__info-input",
    submitButtonSelector: ".form__info-button",
    inactiveButtonClass: "form__info-button_disabled",
    inputErrorClass: "form__info-input_type_error",
    errorClass: "form__info_error_visible"
  }); 