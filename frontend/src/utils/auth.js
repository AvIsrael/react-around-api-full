const BASE_URL = 'https://api.avi.stepovyi.students.nomoredomainssbs.ru';
const handleResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

const registerUser = (user) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: user.password, email: user.email }),
    }).then(handleResponse);
};

const registeredUser = (user) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: user.password, email: user.email }),
    }).then(handleResponse);
};

const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then(handleResponse);
};

export { registerUser, registeredUser, checkToken};