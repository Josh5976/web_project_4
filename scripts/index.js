//form elements
const formElement = document.querySelector(".form");
const formButton = formElement.querySelector(".form__info-button");
const nameInput = formElement.querySelector(".form__info-input_type_name");
const jobInput = formElement.querySelector(".form__info-input_type_job");
//profile elements
const profileButton = document.querySelector(".profile__info-button");
const name = document.querySelector(".profile__info-title");
const job = document.querySelector(".profile__info-subtitle");
//popup elements
const profileCloseButton = document.querySelector(".popup__content-close");
const popup = document.querySelector(".popup");
const postPopup = document.querySelector("#popup_post");
//post elements
const postButton = document.querySelector(".profile__button");
const postCloseButton = document.querySelector("#post_close");
const elements = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const formElementPost = document.querySelector("#form_post");
const titleElement = document.querySelector(".form__info-input_type_title");
const linkElement = document.querySelector(".form__info-input_type_image");
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
const popupTitle = preview.querySelector(".popup__title");
const popupImage = preview.querySelector(".popup__image");
const closePreviewButton = preview.querySelector(".popup__content-close")

//preview functions
closePreviewButton.addEventListener("click", function() {
  preview.classList.toggle("popup_disabled");
});

// post edit functions
function togglePostForm() {
  postPopup.classList.toggle("popup_disabled");
}


function addCard(title, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector(".card__info-title").textContent = title;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").addEventListener("click", function(evt){
    popupImage.src = link;
    popupTitle.textContent = title;
    preview.classList.toggle("popup_disabled");
  });
  cardElement.querySelector(".card__info-button").addEventListener("click", function (evt) {
    evt.target.classList.toggle('card__info-button_active');
  });
  cardElement.querySelector(".card__trash").addEventListener("click", function (evt) {
    evt.target.parentElement.remove();
  });
  elements.append(cardElement);
  titleElement.value = '';
  linkElement.value = '';
}

initialCards.forEach((card) => {
  addCard(card.name, card.link);
});

formElementPost.addEventListener("submit", function(evt) {
  evt.preventDefault();
  addCard(titleElement.value, linkElement.value);
  togglePostForm();
});

postCloseButton.addEventListener('click', togglePostForm);
postButton.addEventListener('click', togglePostForm);


//profile edit functions
function toggleForm() {
    popup.classList.toggle("popup_disabled");
    if (popup.classList.contains("popup_disabled")) {
    } else {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    toggleForm();
}

profileButton.addEventListener('click',toggleForm);
profileCloseButton.addEventListener('click', toggleForm);
formElement.addEventListener('submit', handleProfileFormSubmit);