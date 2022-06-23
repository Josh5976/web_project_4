import "./index.css";
import { 
  editFormElement, editButton, profileName,
  profileJob, editPopup, postPopup, postButton, 
  cardListSelector, postFormElement, preview, initialCards, validationSettings 
} from '../utils/constants.js';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


// POPUP FUNCTIONS / OBJECTS //
const newUserInfo = new UserInfo({nameSelector: profileName, jobSelector: profileJob});

const editFormPopup = new PopupWithForm(editPopup, {handleFormSubmit: (data) => {
  newUserInfo.setUserInfo(data);
}})


const postFormPopup = new PopupWithForm(postPopup, {handleFormSubmit: (data) => {
  const cardElement = createCard(data);
  placeCards.addItem(cardElement);
}});

const previewImagePopup = new PopupWithImage(preview);
previewImagePopup.setEventListeners();

// SET EVENT HANDLERS //

postButton.addEventListener('click', ()=> {
  postFormPopup.open();
  postFormValidator.toggleButton();
});

postFormPopup.setEventListeners();

editButton.addEventListener('click', () => {
  editFormPopup.open() ;
  editFormPopup.setInputValues(newUserInfo.getUserInfo());
  editFormValidator.toggleButton();
});

editFormPopup.setEventListeners();

// CARD FUNCTIONS //

const createCard = (data) => {
  const card = new Card(data, "#card-template", ()=> {handleCardClick(data)});
  return card.generateCard();
}

const handleCardClick = (item) => {
  previewImagePopup.open(item.name, item.link);
}

const placeCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    placeCards.addItem(cardElement);
  }}, cardListSelector
);


// RENDER CARDS //
placeCards.renderItems();


// VALIDATION //

const editFormValidator = new FormValidator(validationSettings, editFormElement);
const postFormValidator = new FormValidator(validationSettings, postFormElement);

editFormValidator.enableValidation();
postFormValidator.enableValidation();