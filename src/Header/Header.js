import homeIcon from '../images/icons8-home.svg';
import spotIcon from '../images/icons8-animal-60.png';
import porfileIcon from '../images/icons8-customer-26.png';
import './Header.scss';

function Header() {
    return (
        <header className='navtab'>
            <img  className='icon-home'src={homeIcon}></img>
            <img className='icon-spot' src={spotIcon}></img>
            <img className='icon-porfile' src={porfileIcon}></img>
        </header>
    )
}

export default Header;