export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            // console.log(response);
            return response.json();
            // return response;
        })
        .then((res) => {
            // console.log(res);
            // console.log(8);
            return res;
        })

        .catch(err => console.log(err))
};

// export const authorize = (identifier, password) => {
//     return fetch(`${BASE_URL}/auth/local`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ identifier, password })
//     })
//         .then((response => response.json()))
//         .then((data) => {
//             if (data.user) {
//                 localStorage.setItem('jwt', data.jwt);

//                 return data;
//             }
//         })
//         .catch(err => console.log(err))
// };

// export default BASE_URL;