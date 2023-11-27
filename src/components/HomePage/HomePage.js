import './HomePage.scss';
import heartIcon from '../../images/heartLike.png';
import commentIcon from '../../images/comment.png';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { db, auth } from '../../config/firebase';
import { getDocs, collection, addDoc, query, where, deleteDoc } from 'firebase/firestore'
import likeHeart from '../../images/heartLikeFill.png';


function HomePage(){


    const user = auth.currentUser;

    const postTable = collection(db, 'Post-Table');
    const likesTable = collection(db, 'likes')

    const [descriptionImage, setDescriptionImage] = useState([]);
    const [likesAmount, setLikesAmount] = useState(null)
    const [userLikedPosts, setUserLikedPosts] = useState([]); // New state to store posts liked by the user


    const postId = descriptionImage.map(id => id.id) //array
    const likes = query(likesTable, where('post_id', '==', postId ))
    
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
            const data = await getDocs(likes);
            setLikesAmount(data.docs.length);

            const likedPosts = data.docs.map(doc => doc.data().post_id);
            setUserLikedPosts(likedPosts);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(()=> {
        getLikes()
    }, [descriptionImage])
    

    const addLike = async()=> {

        try {
        
              const likeQuery = query(likesTable, where('post_id', '==', postId), where('user_id', '==', user.uid));
              const likeSnapshot = await getDocs(likeQuery);
        
              if (!likeSnapshot.empty) {
                const likeDoc = likeSnapshot.docs[0];
                await deleteDoc(likeDoc.ref);
              }

            else {
              await addDoc(likesTable, {
                post_id: postId,
                user_id: user.uid,
              });
              setLikesAmount(likesAmount + 1);
            }
            getLikes();

        } 
        catch(err){
            console.error(err)
            }
        }


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
                        {data.caption && (
                            <div className='descriptionWname'>
                            <p className='porfileName-description'>{data.username}</p>
                            <p className='description'>{data.caption}</p>
                            </div>
                            )}                        
                            <div className='reaction-container'>
                            {/* <img className='like' src={heartIcon} onClick={addLike}></img> */}
                            <img
                                className='like'
                                src={userLikedPosts.includes(data.id) ? likeHeart : heartIcon}
                                onClick={() => addLike(data.id)}
                            ></img>
                            {likesAmount &&
                            <p className='likes-amount'>Likes: {likesAmount} </p>
                            }
                            <Link to={`/comments/${data.id}`}>
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