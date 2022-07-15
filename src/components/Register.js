import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { Link, Withrouter } from 'react-router-dom';
import Header from './Header';
import InfoTooltip from './InfoTooltip';
// import * as form '../auth.js';

function Register(props) {
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
    //     <div className="register">
    //         <p className="register__welcome">
    //             Регистрация
    //         </p>
    //         <form className="register__form">
    //             <input className="register__input" required id="email" name="email" type="text" placeholder="Email"
    //             value={email}/>

    //             <input className="register__input" required id="password" name="password" type="password" placeholder="Пароль"
    //             value={password}/>
    //             <div className="register__button-container">
    //                 <button type="submit" className="register__link">Зарегистрироваться</button>
    //             </div>
    //         </form>
    //     </div>
    // )

    return (
        <>
            <Header title="Войти">
            </Header>
            <PopupWithForm name="register" title="Регистрация" onSubmit={handleSubmit} buttonText="Зарегистрироваться">
                <input className="account__input" required id="email" name="email" type="text" placeholder="Email"
                    value={email} />
                <input className="account__input" required id="password" name="password" type="password" placeholder="Пароль"
                    value={password} />
                <div class="register-login">
                    <button className="register-login__btn">Уже зарегистрированы? Войти</button>
                </div>
            </PopupWithForm>
            <InfoTooltip isOpen={true}/>
        </>
    )
}

export default Register;