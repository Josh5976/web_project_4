//form elements
const editFormElement = document.querySelector(".form");

//profile elements
const editButton = document.querySelector(".profile__info-button");
const profileName = ".profile__info-title";
const profileJob = ".profile__info-subtitle";

//popup elements
const editPopup = "#edit_popup";
const postPopup = "#popup_post";

//post elements
const postButton = document.querySelector(".profile__button");
const cardListSelector = ".elements";
const postFormElement = document.querySelector("#form_post");

//preview post elements
const preview = ".popup_type_preview";

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


  export { 
    editFormElement, editButton, profileName,
    profileJob, editPopup, postPopup, postButton, 
    cardListSelector, postFormElement, preview, initialCards 
};