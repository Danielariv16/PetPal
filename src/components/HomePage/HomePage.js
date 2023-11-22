import './HomePage.scss';
import trying from '../images/staticImage.jpg';
import heartIcon from '../images/heartLike.png';
import commentIcon from '../images/comment.png';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

function HomePage(){
    return (
        <>
            <Header />
            <main className='HomePage'>
                <div className='main-picName'>
                    <div className='main-porfilePic'></div>
                    <h7 className='porfileName'>Name</h7>
                </div>
                <img className='postPic' src={trying}></img>
                <div className='reaction-container'>
                    <img className='like' src={heartIcon}></img>
                    <Link to={'/comments'}>
                        <img className='comment' src={commentIcon}></img>
                    </Link>
                </div>
            </main>
        
        </>
    )
}

export default HomePage;