import './HomePage.scss';
import heartIcon from '../images/heartLike.png';
import commentIcon from '../images/comment.png';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from '../../config/firebase';



function HomePage(){

    const imagesFolder = ref(storage, 'imagesHome');
    
    const [images, setImages] = useState([]);


    useEffect(() => {
        const getImages = async () => {
            try {
                const response = await listAll(imagesFolder);
                const urls = [];
    
                for (const item of response.items) {
                    const url = await getDownloadURL(item);
                    urls.push(url);
                }
    
                setImages(urls);
            } catch (error) {
                console.error('Error getting images:');
            }
        };
    
        getImages();
    }, []);
    

    return (
        <>
            <Header />
            <main className='HomePage'>
                {images?.map((url) =>(
                    <>
                        <div className='main-picName'>
                            <div className='main-porfilePic'></div>
                            <h6 className='porfileName'>Name</h6>
                        </div>
                        <img className='postPic' src={url}></img>
                        <div className='reaction-container'>
                            <img className='like' src={heartIcon}></img>
                            <Link to={'/comments'}>
                            <img className='comment' src={commentIcon}></img>
                            </Link>
                        </div>
                    </>
                    ))}
            </main>
        
        </>
    )
}

export default HomePage;