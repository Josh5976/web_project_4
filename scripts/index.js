//form elements
const profileFormElement = document.querySelector(".form");
const formButton = profileFormElement.querySelector(".form__info-button");
const profileNameInput = profileFormElement.querySelector(".form__info-input_type_name");
const profileJobInput = profileFormElement.querySelector(".form__info-input_type_job");

//profile elements
const profileButton = document.querySelector(".profile__info-button");
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");

//popup elements
const profileCloseButton = document.querySelector(".popup__content-close");
const profilePopup = document.querySelector(".popup");
const postPopup = document.querySelector("#popup_post");

//post elements
const postButton = document.querySelector(".profile__button");
const postCloseButton = document.querySelector("#post_close");
const elements = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const formElementPost = document.querySelector("#form_post");
const postTitleElement = document.querySelector(".form__info-input_type_title");
const postLinkElement = document.querySelector(".form__info-input_type_image");
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
const previewPopupTitle = preview.querySelector(".popup__title");
const previewPopupImage = preview.querySelector(".popup__image");
const closePreviewButton = preview.querySelector(".popup__content-close")

//popup functions
function openPopup(elem) {
  elem.classList.remove("popup_disabled");
}

function closePopup(elem) {
  elem.classList.add("popup_disabled");
}

//preview functions
closePreviewButton.addEventListener("click", function(){
  closePopup(preview);
});

// post edit functions
function createCard(title, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__info-title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = title;
  cardImage.src = link;
  cardImage.alt = `A picture of ${title}`;
  cardImage.addEventListener("click", function(){
    previewPopupImage.src = link;
    previewPopupImage.alt = `The full picture of ${title}`;
    previewPopupTitle.textContent = title;
    openPopup(preview);
  });
  cardElement.querySelector(".card__info-button").addEventListener("click", function (evt) {
    evt.target.classList.toggle('card__info-button_active');
  });
  cardElement.querySelector(".card__trash").addEventListener("click", function (evt) {
    evt.target.parentElement.remove();
  });
  return cardElement;
}

function renderCard(item) {
  elements.prepend(item);
}

function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  renderCard(createCard(postTitleElement.value, postLinkElement.value));
  postTitleElement.value = '';
  postLinkElement.value = '';
  closePopup(postPopup);
}

formElementPost.addEventListener("submit", cardFormSubmitHandler);
postCloseButton.addEventListener('click', function(){
  closePopup(postPopup);
});
postButton.addEventListener('click', function(){
  openPopup(postPopup);
});

initialCards.forEach((card) => {
  renderCard(createCard(card.name, card.link))
});

//profile functions
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

profileButton.addEventListener('click', function(){
  fillProfilePopup();
  openPopup(profilePopup);
});
profileCloseButton.addEventListener('click', function(){
  closePopup(profilePopup);
});
profileFormElement.addEventListener('submit', handleProfileFormSubmit);