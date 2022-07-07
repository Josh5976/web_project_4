import "./index.css";
import { 
  editFormElement, editButton, profileName,
  profileJob, editPopup, postPopup, postButton, 
  cardListSelector, postFormElement, preview, validationSettings,
  profilePicture, deletePopup, avatarPopup, editAvatarButton, avatarForm
} from '../utils/constants.js';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithDeleteConfirm from "../components/PopupWithDeleteConfirm.js";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {Api} from "../components/Api.js";


// Card Functions //
const returnCard = (data) => {
  const card = new Card(
    data,
    "#card-template", 
    ()=> {handleCardClick(data)}, 
    api,
    deleteCardPopupConfirm,
    );
    return card;
}

const createCard = (card, owner, user) => {
  return card.generateCard(owner, user);
}



const handleCardClick = (item) => {
  previewImagePopup.open(item.name, item.link);
}

const handleDeleteConfirm = (card) => {
  card.handleDeleteIcon();
}

// API //
let placeCards;
let userId;

export const userInfo = new UserInfo({
  nameSelector: profileName, jobSelector: profileJob, pictureSelector: profilePicture
});

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "0c1c8300-b967-41c5-9764-d6d1a233a155",
    "Content-Type": "application/json"
  }
});

api.getInitialCards()
  .then((result) => {
    placeCards = new Section({
      items: result,
      renderer: (item) => {
        const cardElement = createCard(returnCard(item), item.owner._id,userId, item._id);
        placeCards.addItem(cardElement);
        
      }}, cardListSelector
    );
    placeCards.renderItems();
  })
  .catch((err) => console.log("This is an error", err));

api.getUser()
  .then((result) => {
    userInfo.setUserInfo({name: result.name, about: result.about});
    userInfo.setAvatar({avatar: result.avatar});
    userId = result._id;
  })
  .catch((err => {
    console.log(err)
  }))

// POPUP FUNCTIONS //
const changeAvatarPopup = new PopupWithForm(avatarPopup, {handleFormSubmit: (data) => {
  api.changeAvatar({avatar: data.avatar});
  userInfo.setAvatar({avatar: data.avatar});
}})
changeAvatarPopup.setEventListeners();

const deleteCardPopupConfirm = new PopupWithDeleteConfirm(deletePopup, handleDeleteConfirm);
deleteCardPopupConfirm.setEventListeners();

const editFormPopup = new PopupWithForm(editPopup, {handleFormSubmit: (data) => {
  api.changeUser({userName: data.name, userOccupation: data.occupation});
  userInfo.setUserInfo({name: data.name, about: data.occupation});
}})

const postFormPopup = new PopupWithForm(postPopup, {handleFormSubmit: (data) => {
  api.addCard(data)
  .then((result) => {
    const cardElement = createCard(returnCard(result), userId, userId);
    placeCards.addItem(cardElement);
    
  })
}});

const previewImagePopup = new PopupWithImage(preview);
previewImagePopup.setEventListeners();

// SET EVENT HANDLERS //

editAvatarButton.addEventListener('click', () => {
  changeAvatarPopup.open();
  avatarFormValidator.toggleButton();
})

postButton.addEventListener('click', ()=> {
  postFormPopup.open();
  postFormValidator.toggleButton();
});

postFormPopup.setEventListeners();

editButton.addEventListener('click', () => {
  editFormPopup.open() ;
  editFormPopup.setInputValues(userInfo.getUserInfo());
  editFormValidator.toggleButton();
});

editFormPopup.setEventListeners();

// VALIDATION //

const editFormValidator = new FormValidator(validationSettings, editFormElement);
const postFormValidator = new FormValidator(validationSettings, postFormElement);
const avatarFormValidator = new FormValidator(validationSettings, avatarForm);

editFormValidator.enableValidation();
postFormValidator.enableValidation();
avatarFormValidator.enableValidation();