let formElement = document.querySelector(".form");
let formButton = formElement.querySelector(".form__button");
let editPage = document.querySelector(".edit");
let editButton = document.querySelector(".profile__info-button");
let closeButton = document.querySelector(".edit__close");


function openForm() {
    editPage.style.display= "block";
    document.querySelector(".page__none").classList.toggle("page__overlay");
}

function closeForm() {
    editPage.style.display = "none";
    document.querySelector(".page__none").classList.toggle("page__overlay");
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    let nameInput = formElement.querySelector(".form__input_name");
    let jobInput = formElement.querySelector(".form__input_job");

    let name = document.querySelector(".profile__info-title");
    let job = document.querySelector(".profile__info-subtitle");

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}

editButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);
formElement.addEventListener('submit', handleProfileFormSubmit);