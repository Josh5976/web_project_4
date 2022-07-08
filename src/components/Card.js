
class Card {
    constructor(data, cardSelector, handleCardClick, api, deleteCardPopup) {
        this.handleCardClick = handleCardClick;
        this._data = data;
        this._name = data.name;
        this._link = data.link;

        this._cardSelector = cardSelector;
        this._id = data._id;
        this._likes = data.likes;
        this._api = api;
        this._deleteCardPopup = deleteCardPopup;
    }

    getId() {
        return this._id;
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector)
        .content.querySelector(".card").cloneNode(true);
    }

    _handleLikeIcon(evt) {
        evt.target.classList.toggle("card__info-button_active");
    }

    _isLiked() {
        return this._likeButton.classList.contains("card__info-button_active");
        
    }

    setLikes() {
        if(!this._isLiked()) {
            this._api.addLike(this._id)
            .then((result) => {
                this._likeButton.classList.add('card__info-button_active');
                this._likesElement.textContent = result.likes.length;
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            this._api.deleteLike(this._id)
            .then((result) => {
                this._likeButton.classList.remove('card__info-button_active');
                this._likesElement.textContent = result.likes.length;
            })
            .catch((err) => {
                console.log(err);
            })
        }
    } 


    
    handleDeleteIcon() {
        this._api.deleteCard(this._id)
        .then(()=> {
            this._template.remove();
            this._template = null;
            this._deleteCardPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    

    _setEventListeners() {
        this._likeButton.addEventListener("click", this.setLikes.bind(this))
        this._deleteButton.addEventListener("click", () => {
            this._deleteCardPopup.open(this);
        });
        
        this._cardImage.addEventListener("click", this.handleCardClick);
    }

    generateCard(ownerId, userId) {
        this._template = this._getTemplate();
        this._likeButton = this._template.querySelector(".card__info-button");
        this._deleteButton = this._template.querySelector(".card__trash");
        if(ownerId != userId) {
            this._deleteButton.remove();
        }
        if(this._likes.some(item => item._id === userId)) {
            this._likeButton.classList.add('card__info-button_active');
        }
    
        this._likesElement = this._template.querySelector(".card__info-likes");
        this._likesElement.textContent = this._likes.length;
        
        this._cardImage = this._template.querySelector(".card__image");
        this._template.querySelector(".card__info-title").textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = `A picture of ${this._name}`;
        this._setEventListeners();

        return this._template;
    }
    
}


export default Card;