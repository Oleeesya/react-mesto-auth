import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from 'react';
import Header from './Header';
import { Link, Withrouter } from 'react-router-dom';
// import * as form '../auth.js';

function Login(props) {
    const [email, setName] = useState('');
    const [password, setPassword] = useState('');

    // handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setState({
    //         [name]: value
    //     })
    // };

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     if(email || password) {
    //         return;
    //     }
    //     auth.authorize(email, password)
    //     .then((data) => {
    //         setState({email: '', password: ''}, () => {
    //             props.handleLogin(data.user._ru_cal_goal.calGoal);
    //             props.history.push('/');
    //         })
    //     })
    //     .catch(err => console.log(err));
    // }

    //delete
    function handleSubmit(e) {
        e.preventDefault();
    }

    // return (
    //     <div className="login">
    //         <p className="login__welcome">
    //             Вход
    //         </p>
    //         <form className="login__form">
    //             <input className="login__input" required id="email" name="email" type="text" placeholder="Email"
    //             value={email}/>

    //             <input className="login__input" required id="password" name="password" type="password" placeholder="Пароль"
    //             value={password}/>
    //             <div className="login__button-container">
    //                 <button type="submit" className="login__link">Войти</button>
    //             </div>
    //         </form>
    //     </div>
    // )
    return (
        <>
            <Header title="Регистрация">
            </Header>
            <PopupWithForm name="login" title="Вход" onSubmit={handleSubmit} buttonText="Войти">
                <input className="account__input" required id="email" name="email" type="text" placeholder="Email"
                    value={email} />
                <input className="account__input" required id="password" name="password" type="password" placeholder="Пароль"
                    value={password} />
            </PopupWithForm>
        </>
    )
}

export default Login;