export class Api {
    constructor(options) {
        this._url = options.url;
        this._header = options.header;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //загрузка информации о пользователе
    getUserInfo() {
        return fetch(this._url + '/users/me', {
            headers: this._header
        })
            .then(this._handleResponse)
    }

    //загрузка карточек с сервера
    getInitialCards() {
        return fetch(this._url + '/cards', {
            headers: this._header
        })
            .then(this._handleResponse)
    }

    //редактирование профиля
    editUserInfo(userInfo) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.about
            })
        })
            .then(this._handleResponse)
    }

    //добавление новой карточки
    postCards(cardInfo) {
        return fetch(this._url + '/cards', {
            method: 'POST',
            body: JSON.stringify({
                link: cardInfo.link,
                name: cardInfo.name
            }),
            headers: this._header,
        })
            .then(this._handleResponse)
    }

    //удаление карточки
    deleteCard(cardInfo) {
        return fetch(this._url + '/cards/' + cardInfo._id, {
            method: 'DELETE',
            headers: this._header,
        })
            .then(this._handleResponse)
    }

    //постановка лайка
    likeCards = (cardInfo) => {
        return fetch(this._url + '/cards/' + cardInfo._id + '/likes', {
            method: 'PUT',
            headers: this._header,
        })
            .then(this._handleResponse)
    }

    //снятие лайка
    deleteLikeCards = (cardInfo) => {
        return fetch(this._url + '/cards/' + cardInfo._id + '/likes', {
            method: 'DELETE',
            headers: this._header,
        })
            .then(this._handleResponse)
    }

    //постановка и снятие лайка
    changeLikeCardStatus = (cardInfo, isNotLiked) => {
        if (isNotLiked) {
            return this.likeCards(cardInfo)
        }
        else {
            return this.deleteLikeCards(cardInfo)
        }
    }

    // обновление аватара пользователя
    editAvatarUser(avatarInfo) {
        return fetch(this._url + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({
                avatar: avatarInfo.avatar
            })
        })
            .then(this._handleResponse)
    }
}

const api = new Api(
    {
        url: 'https://mesto.nomoreparties.co/v1/cohort-42',
        header: {
            authorization: 'b4769460-c207-4cd1-a9d9-ca6bcf7522ce',
            'Content-Type': 'application/json'
        }
    }
);

export default api;


