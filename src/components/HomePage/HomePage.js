import './HomePage.scss';
import heartIcon from '../../images/heartLike.png';
import commentIcon from '../../images/comment.png';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { db, auth } from '../../config/firebase';
import { getDocs, collection, addDoc, query, where, deleteDoc } from 'firebase/firestore'


function HomePage(){


    const user = auth.currentUser;

    const postTable = collection(db, 'Post-Table');
    const likesTable = collection(db, 'likes')

    const [descriptionImage, setDescriptionImage] = useState([]);
    const [likesAmount, setLikesAmount] = useState(null)



    const postId = descriptionImage.map(id => id.id) //array
    const likes = query(likesTable, where('post_id', '==', postId ))
    // console.log(likes)
    
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
    

    const getLikes = async() =>{
        const data = await getDocs(likes)
        setLikesAmount(data.docs.length)
    }

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
                            <div className='main-porfilePic'></div>
                            <h6 className='porfileName'>{data.username}</h6>
                        </div>
                        <img className='postPic' src={data.image_url}></img>
                        {data.caption && (
                            <p className='description'>{data.caption}</p>
                            )}                        
                            <div className='reaction-container'>
                            <img className='like' src={heartIcon} onClick={addLike}></img>
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