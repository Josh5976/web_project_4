import FormValidator from "./FormValidator.js";
import Card from "./card.js";
import {closePopupEsc, closePopupOnRemoteClick, openPopup, closePopup} from "./utils.js";


//form elements
const editFormElement = document.querySelector(".form");
const formButton = editFormElement.querySelector(".form__info-button");
const profileNameInput = document.querySelector(".form__info-input_type_name");
const profileJobInput = document.querySelector(".form__info-input_type_job");

//profile elements
const profileButton = document.querySelector(".profile__info-button");
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");

//popup elements
const profileCloseButton = document.querySelector(".popup__content-close");
const profilePopup = document.querySelector("#edit_popup");
const postPopup = document.querySelector("#popup_post");

//post elements
const postButton = document.querySelector(".profile__button");
const postCloseButton = document.querySelector("#post_close");
const elements = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const postFormElement = document.querySelector("#form_post");
const postTitleElement = document.querySelector(".form__info-input_type_title");
const postLinkElement = document.querySelector(".form__info-input_type_image");
const postSubmitButton = document.querySelector("#post_submit");
const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
  ];

//preview post elements
const preview = document.querySelector(".popup_type_preview");
const closePreviewButton = preview.querySelector(".popup__content-close")

// SET EVENT HANDLERS //
closePreviewButton.addEventListener("click", ()=> closePopup(preview));

postFormElement.addEventListener("submit", cardFormSubmitHandler);

postCloseButton.addEventListener('click', ()=> closePopup(postPopup));

postButton.addEventListener('click', ()=> openPopup(postPopup));

profileButton.addEventListener('click', ()=> {
  fillProfilePopup();
  openPopup(profilePopup);
});

profileCloseButton.addEventListener('click', ()=> closePopup(profilePopup));

editFormElement.addEventListener('submit', handleProfileFormSubmit);

// CARD FUNCTIONS
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  renderCard({name: postTitleElement.value, link: postLinkElement.value}, elements);
  postFormElement.reset();
  closePopup(postPopup);
  postFormValidator._toggleButton();
}

const renderCard = (data, wrap) => {
  elements.prepend(new Card(data, '#card-template').generateCard());
}


initialCards.forEach((card) => {
  renderCard(card, elements)
});

//PROFILE FUNCTIONS
function fillProfilePopup(){
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profilePopup);
}



// VALIDATION //

const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__info-input",
  submitButtonSelector: ".form__info-button",
  inactiveButtonClass: "form__info-button_disabled",
  inputErrorClass: "form__info-input_type_error",
  errorClass: "form__info_error_visible"
};

const editFormValidator = new FormValidator(validationSettings, editFormElement);
const postFormValidator = new FormValidator(validationSettings, postFormElement);

editFormValidator.enableValidation();
postFormValidator.enableValidation();

