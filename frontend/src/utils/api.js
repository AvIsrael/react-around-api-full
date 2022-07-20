import {BASE_URL} from "./baseurl";

class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _customFetch = (url, headers) => {
        return fetch(url, headers).then((res) =>
                res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
        );
    };

    getUserInfo() {
        return this._customFetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        });
    }

    getInitialCards() {
        return this._customFetch(`${this._baseUrl}/cards`,{
            headers: this._headers,
        });
    }

    createCard(data) {
        return this._customFetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    deleteCard(cardId) {
        return this._customFetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: "DELETE",
        });
    }

    editProfile({name, about}) {
        return this._customFetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        });
    }

    editAvatar({avatar}) {
        return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                avatar: avatar,
            }),
        });
    }

    changeLikeCardStatus(cardId, isLiked) {
        return this._customFetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: `${isLiked ? "DELETE" : "PUT"}`,
        });
    }
}

const api = new Api(
    BASE_URL,
    {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
);

export default api;