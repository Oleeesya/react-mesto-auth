import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function Header(props) {
  const [isMobile, setMobile] = useState(false);

  const history = useHistory();

  const onSignOut = () => {
    if (props.title == 'Войти') {
      history.push('/sign-in');
    }
    else if (props.title == 'Выйти') {
      localStorage.removeItem('jwt');
      props.setToken('');
      props.handleLogin(false);
      history.push('/sign-in');
    }
    else {
      history.push('/sign-up')
    }
  }

  const clickMobileMenu = () => {
    if (props.title == 'Выйти') {
      setMobile(!isMobile);
    }
  }

  const getButtonClass = (status) => {
    if (status === true && props.title == 'Выйти') {
      return 'header__menu-mobile_status_opened'
    }
    else if (props.title == 'Выйти') {
      return 'header__menu-mobile'
    }
    else {
      return 'header__menu-mobile_status_close'
    }
  }

  return (
    <header className={`${props.title == 'Выйти' && isMobile ? 'header header_status_mobile' : 'header'}`}>
      <div className="header__logo"></div>
      <div className={`${props.title == 'Выйти' ? 'header__menu header__menu_status_mobile' : 'header__menu'}`}>
        {props.children}
        <button className={`${props.title == 'Выйти' ? 'header__btn header__btn_recorded' : 'header__btn'}`}
          onClick={onSignOut}>{props.title}</button>
      </div>
      <button className={`${getButtonClass(isMobile)}`} onClick={clickMobileMenu}></button>
    </header>
  );
}

export default Header;