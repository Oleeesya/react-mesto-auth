import React from 'react';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import Header from './Header';

function Login({handleAuthorize}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        handleAuthorize(password, email);
        setEmail();
        setPassword();
    }

    return (
        <>
            <Header title="Регистрация">
            </Header>
            <PopupWithForm name="login" title="Вход" onSubmit={onLogin} buttonText="Войти">

                <input className="account__input" required id="email" name="email" type="text" placeholder="Email"
                    value={email || ''} onChange={({ target }) => setEmail(target.value)} autoComplete="off" />
                <input className="account__input" required id="password" name="password" type="password" placeholder="Пароль"
                    value={password || ''} onChange={({ target }) => setPassword(target.value)} autoComplete="off" />

            </PopupWithForm>
        </>
    )
}

export default Login;

