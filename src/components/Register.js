import React from 'react';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import Header from './Header';
import { useHistory } from 'react-router-dom';

function Register({handleRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleClick = () => {
        history.push('/sign-in')
    }

    const onRegister = (e) => {
        e.preventDefault();
        handleRegister(email, password)
    }

    return (
        <>
            <Header title="Войти">
            </Header>
            <PopupWithForm name="register" title="Регистрация" onSubmit={onRegister} buttonText="Зарегистрироваться">

                <input className="account__input" required id="email" name="email" type="text" placeholder="Email"
                    value={email} onChange={({ target }) => setEmail(target.value)} autoComplete="off" />

                <input className="account__input" required id="password" name="current-password" type="password" placeholder="Пароль"
                    value={password} onChange={({ target }) => setPassword(target.value)} autoComplete="off" />

                <div className="register-login">
                    <button className="register-login__btn" onClick={handleClick} type="button">Уже зарегистрированы? Войти</button>
                </div>

            </PopupWithForm>
        </>
    )
}

export default Register;