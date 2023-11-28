import './HomePage.scss';
import heartIcon from '../../images/heartLike.png';
import commentIcon from '../../images/comment.png';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { db, auth } from '../../config/firebase';
import { getDocs, collection, doc,
    getDoc, setDoc} from 'firebase/firestore'
import likeHeart from '../../images/heartLikeFill.png';


function HomePage(){


    const user = auth.currentUser;

    const postTable = collection(db, 'Post-Table');

    const [descriptionImage, setDescriptionImage] = useState([]);
    const [userLikedPosts, setUserLikedPosts] = useState([]); // New state to store posts liked by the user


    // const postId = descriptionImage.map(id => id.id) 
    
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
    


    const getLikes = async () => {
        try {
            const data = await getDocs(postTable);
            const posts = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
    
            setDescriptionImage(posts);
        } catch (error) {
            console.error(error);
        }
    };
    
    

    useEffect(()=> {
        getLikes()
    }, [descriptionImage])
    


    const addLike = async (postId) => {
        try {
            const postRef = doc(postTable, postId);
            const postSnapshot = await getDoc(postRef);
    
            if (postSnapshot.exists()) {
                const post = postSnapshot.data();
                const likedUsers = post.likes || [];
    
                if (likedUsers.includes(user.uid)) {
                    const updatedLikedUsers = likedUsers.filter((userId) => userId !== user.uid);
                    await setDoc(postRef, { likes: updatedLikedUsers }, { merge: true });
                } else {
                    likedUsers.push(user.uid);
                    await setDoc(postRef, { likes: likedUsers }, { merge: true });
                }
                    getLikes();
            }
        } catch (err) {
            console.error(err);
        }
    };
    
    
    


    return (
        <>
            <Header />
            <main className='HomePage'>
                {descriptionImage?.map((data) =>(
                    
                    <>
                        <div className='main-picName' key={data.id}>
                            <img src={data.porfilePic} className='main-porfilePic'></img>
                            {/* <div className='main-porfilePic'></div> */}
                            <h6 className='porfileName'>{data.username}</h6>
                        </div>
                        <img className='postPic' src={data.image_url}></img>
                            <div className='reaction-container'>
                            {/* <img className='like' src={heartIcon} onClick={addLike}></img> */}
                            <img
                                className='like'
                                src={userLikedPosts.includes(data.id) ? likeHeart : heartIcon}
                                onClick={() => addLike(data.id)}
                            ></img>
                            <Link to={`/comments/${data.id}`}>
                            <img className='comment' src={commentIcon}></img>
                            </Link>
                        </div>
                        {data.likes &&
                        <p className='likes-amount'>{data.likes.length} likes</p>
                        }
                        {data.caption && (
                            <div className='descriptionWname'>
                            <p className='porfileName-description'>{data.username}</p>
                            <p className='description'>{data.caption}</p>
                            </div>
                            )}                        
                    </>
                    ))}
            </main>
        
        </>
    )
}

export default HomePage;