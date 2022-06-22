import "../pages/index.css";
import {initialCards} from '../scripts/initialCards.js';
import FormValidator from "./FormValidator.js";
import Card from "./card.js";

import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

//form elements
const editFormElement = document.querySelector(".form");
const profileNameInput = document.querySelector(".form__info-input_type_name");
const profileJobInput = document.querySelector(".form__info-input_type_job");

//profile elements
const editButton = document.querySelector(".profile__info-button");
const profileName = ".profile__info-title";
const profileJob = ".profile__info-subtitle";

//popup elements
const editCloseButton = document.querySelector(".popup__content-close");
const editPopup = "#edit_popup";
const postPopup = "#popup_post";

//post elements
const postButton = document.querySelector(".profile__button");
const postCloseButton = document.querySelector("#post_close");
const cardListSelector = ".elements";
const postFormElement = document.querySelector("#form_post");
const postTitleElement = document.querySelector(".form__info-input_type_title");
const postLinkElement = document.querySelector(".form__info-input_type_image");
const postSubmitButton = document.querySelector("#post_submit");

//preview post elements
const preview = ".popup_type_preview";
const previewCloseButton = document.querySelector(".popup__content-close_type_preview");

// POPUP FUNCTIONS / OBJECTS //
const newUserInfo = new UserInfo({nameSelector: profileName, jobSelector: profileJob});

const editFormPopup = new PopupWithForm(editPopup, {handleFormSubmit: (data) => {
  newUserInfo.setUserInfo(data);
}})


const postFormPopup = new PopupWithForm(postPopup, {handleFormSubmit: (data) => {
  const card = new Card(data, '#card-template', () => {
    handleCardClick(data);
  });
  const cardElement = card.generateCard();
  placeCards.addItem(cardElement);
}});

const previewImagePopup = new PopupWithImage(preview);

// SET EVENT HANDLERS //
previewCloseButton.addEventListener('click', ()=> previewImagePopup.close());


postCloseButton.addEventListener('click', ()=> postFormPopup.close());

postButton.addEventListener('click', ()=> {
  postFormPopup.open();
  postFormPopup.setEventListeners();
  postFormValidator.toggleButton();
});

editButton.addEventListener('click', () => {
  editFormPopup.open() ;
  editFormPopup.setEventListeners();
  profileNameInput.value = newUserInfo.getUserInfo().name;
  profileJobInput.value = newUserInfo.getUserInfo().occupation;
  editFormValidator.toggleButton();
});

editCloseButton.addEventListener('click', ()=> editFormPopup.close());

// CARD FUNCTIONS

const handleCardClick = (item) => {
  previewImagePopup.open(item.name, item.link);
  previewImagePopup.setEventListeners();
}

const placeCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, "#card-template", ()=> {handleCardClick(item)});
    const cardElement = card.generateCard();
    placeCards.addItem(cardElement);
  }}, cardListSelector
);

placeCards.renderItems();


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