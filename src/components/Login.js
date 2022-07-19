import React from 'react';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import Header from './Header';
import InfoTooltip from './InfoTooltip';
import { useHistory } from 'react-router-dom';

import * as auth from '../utils/Auth.js';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const onLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        auth.authorize(password, email)
            .then((data) => {
                if (data.token) {
                    setEmail();
                    setPassword();
                    props.handleLogin(true);
                    history.push('/');
                }
            })
            .catch((err) => {
                console.log(err);
                props.handleOpenTooltip();
            });
    }

    return (
        <>
            <Header title="Регистрация">
            </Header>
            <PopupWithForm name="login" title="Вход" onSubmit={onLogin} buttonText="Войти">

                <input className="account__input" required id="email" name="email" type="text" placeholder="Email"
                    value={email} onChange={({ target }) => setEmail(target.value)} autoComplete="off" />
                <input className="account__input" required id="password" name="password" type="password" placeholder="Пароль"
                    value={password} onChange={({ target }) => setPassword(target.value)} autoComplete="off" />

            </PopupWithForm>
            <InfoTooltip handleOpenTooltip={props.handleOpenTooltip} isRegistrationStatus={props.isRegistrationStatus}
                onClose={props.onClose} isTooltip={props.isTooltip} />
        </>
    )
}

export default Login;

