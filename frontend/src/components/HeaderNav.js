import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import hamburgerIcon from '../images/button-hamburger.svg';
import closeButton from '../images/button-cancel.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';

const HeaderNav = (props) => {
    const {isLoggedIn, handleLogout, handleHamburgerClick, isDropDownOpen, isMobileSized} = props;
    const currentPath = useLocation().pathname;
    const linkTo = currentPath === '/signin' ? '/signup' : '/signin';
    const linkText = linkTo === '/signin' ? 'Log in' : 'Sign up';
    const currentUser = React.useContext(CurrentUserContext);

    return isMobileSized && isLoggedIn ? (
        <img
            onClick={handleHamburgerClick}
            className={isDropDownOpen ? 'header__user-link-link header__nav-link_type_close' : 'header__user-link'}
            src={isDropDownOpen ? closeButton : hamburgerIcon}
            alt={isDropDownOpen ? 'close icon' : 'hamburger icon'}
        ></img>
    ) : isLoggedIn ? (
        <div className="header__menu-wrapper">
            <span className="header__user-data">{currentUser.email}</span>
            <div className="header__user-link" onClick={handleLogout}>
                <Link to={'/signin'} className="header__link">
                    {'Log out'}
                </Link>
            </div>
        </div>
    ) : (
        <span className="header__user-link">
      <Link to={linkTo}>
        {linkText}
      </Link>
    </span>
    );
};

export default HeaderNav;
