// export const BASE_URL = '';

// export const register = (username, password, email, calGoal) => {
//     return fetch(`${BASE_URL}/auth/local/register`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password, email, ru_cal_goal: calGoal })
//     })
//         .then((response) => {
//             return response.json();
//         })
//         .then((res) => {
//             return res;
//         })
//         .catch((err) => console.log(err));
// };

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