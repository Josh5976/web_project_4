export default class UserInfo {
    constructor({nameSelector, jobSelector, pictureSelector}) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._picture = document.querySelector(pictureSelector);
    }

    getUserInfo() {
        return {name: this._name.textContent, occupation: this._job.textContent};
    }

    setUserInfo({name, about}) {
        this._name.textContent = name;
        this._job.textContent = about;
    }

    setAvatar({avatar}) {
        this._picture.src = avatar;
    }
}