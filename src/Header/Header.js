import homeIcon from '../images/icons8-home.svg';
import spotIcon from '../images/icons8-animal-60.png';
import porfileIcon from '../images/icons8-customer-26.png';
import './Header.scss';
import { Link } from "react-router-dom";



function Header() {
    return (
        <>
        <header className='navtab'>
            <Link to={'/'}>
                <img  className='icon-home'src={homeIcon}></img>
            </Link>
            <Link to={'/spot-light'}>
                <img className='icon-spot' src={spotIcon}></img>
            </Link>
            <Link to={'/porfile'}>
                <img className='icon-porfile' src={porfileIcon}></img>
            </Link>
        </header>
        </>
    )
}

export default Header;