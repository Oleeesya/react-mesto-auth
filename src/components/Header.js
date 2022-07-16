function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__menu">
        {props.children}
        <button className={`${props.title == 'Выйти' ? 'header__btn header__btn_recorded' : 'header__btn'}`}>{props.title}</button>
      </div>
      <button className="header__menu-mobile_status_close"></button>
    </header>
  );
}

export default Header;