import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { Link, useHistory, Withrouter } from 'react-router-dom';
import Header from './Header';
import InfoTooltip from './InfoTooltip';

import * as auth from '../utils/Auth.js';

function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [tooltip, settooltip] = useState(false);


    const history = useHistory();

    // handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setState({
    //         [name]: value
    //     })
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(email, password)
        .then((res) => {

            if (res.email && res.password) {
                props.handleRegistrationStatus();
                props.handleOpenTooltip();
                history.push('/sign-in');
            }
            else {
                props.handleOpenTooltip();

                // props.isOpen();

                // {props.onTooltip()};
                // settooltip(true);
                // console.log(tooltip)
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <>
            <Header title="Войти">
            </Header>
            <PopupWithForm name="register" title="Регистрация" onSubmit={handleSubmit} buttonText="Зарегистрироваться">
             
                <input className="account__input" required id="email" name="email" type="text" placeholder="Email"
                    value={email} onChange={({ target }) => setEmail(target.value)} autoComplete="off"/>

                <input className="account__input" required id="password" name="current-password" type="password" placeholder="Пароль"
                    value={password} onChange={({ target }) => setPassword(target.value)} autoComplete="off"/>
                
                <div class="register-login">
                    <button className="register-login__btn">Уже зарегистрированы? Войти</button>
                </div>
            </PopupWithForm>
            <InfoTooltip handleOpenTooltip={props.handleOpenTooltip} isRegistrationStatus={props.isRegistrationStatus}
             onClose={props.onClose} isTooltip={props.isTooltip}  />
        </>
    )
}

export default Register;