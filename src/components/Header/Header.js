import homeIcon from '../../images/home.png';
import spotIcon from '../../images/heart.png';
import porfileIcon from '../../images/porfile.png';
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