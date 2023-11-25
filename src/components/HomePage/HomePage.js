import './HomePage.scss';
import heartIcon from '../images/heartLike.png';
import commentIcon from '../images/comment.png';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase';
import { getDocs, collection } from 'firebase/firestore'


function HomePage(){

    const postTable = collection(db, 'Post-Table')

    const [descriptionImage, setDescriptionImage] = useState([]);


    useEffect(() => {
        const post = async() => {
            try {
                const response =  await getDocs(postTable);

                const filteredData =  response.docs.map((doc) => 
                ({...doc.data(), 
                    id: doc.id
                }))

              
                setDescriptionImage(filteredData)
            }
            catch(err){
                console.error(err)
            }
        }
        post()
    }, [])


    return (
        <>
            <Header />
            <main className='HomePage'>
                {descriptionImage?.map((data) =>(
                    
                    <>
                        <div className='main-picName' key={data.id}>
                            <div className='main-porfilePic'></div>
                            <h6 className='porfileName'>{data.username}</h6>
                        </div>
                        <img className='postPic' src={data.image_url}></img>
                        {data.caption && (
                            <p className='description'>{data.caption}</p>
                            )}                        
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