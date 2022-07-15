function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div>
        {props.children}
        <button className={`${props.title=='Выйти' ? 'header__btn header__btn_recorded' : 'header__btn'}`}>{props.title}</button>
      </div>
    </header>
  );
}

export default Header;