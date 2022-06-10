
const closePopupOnRemoteClick = (evt) => {
    if(evt.target === evt.currentTarget){
      closePopup(evt.target);
    };
  }
  
  const closePopupEsc = (evt) => {
    if (evt.key === "Escape") {
      const activePopup = document.querySelector(".popup_enabled");
      closePopup(activePopup);
    }
  };
  
  function openPopup(elem) {
    elem.classList.add("popup_enabled");
    document.addEventListener('keydown', closePopupEsc);
    elem.addEventListener('mousedown', closePopupOnRemoteClick);
  }
  
  function closePopup(elem) {
    elem.classList.remove("popup_enabled");
    document.removeEventListener('keydown', closePopupEsc);
    elem.removeEventListener('mousedown', closePopupOnRemoteClick);
  }

export {closePopupEsc, closePopupOnRemoteClick, openPopup, closePopup};