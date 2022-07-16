import headerLogo from "../images/header-logo.svg";
import HeaderNav from './HeaderNav';
import {Link} from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={'header'}>
            <Link to="/">
                <img src={headerLogo} alt="logo image" className="header__logo"/>
            </Link>
            <HeaderNav {...props} />
        </header>);
}
export default Header;