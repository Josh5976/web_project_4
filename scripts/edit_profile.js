let formElement = document.querySelector(".form");
let formButton = formElement.querySelector(".form__info-button");
let profileButton = document.querySelector(".profile__info-button");
let closeButton = document.querySelector(".edit__content-close");
let nameInput = formElement.querySelector(".form__info-input_type_name");
let jobInput = formElement.querySelector(".form__info-input_type_job");
let name = document.querySelector(".profile__info-title");
let job = document.querySelector(".profile__info-subtitle");

function toggleForm() {
    nameInput.placeholder = name.textContent;
    jobInput.placeholder = job.textContent;
    document.querySelector(".edit").classList.toggle("edit_display_none");
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    toggleForm();
}

profileButton.addEventListener('click', toggleForm);
closeButton.addEventListener('click', toggleForm);
formElement.addEventListener('submit', handleProfileFormSubmit);