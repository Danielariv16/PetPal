import arrow from '../../images/arrow.png';
import './Comments.scss';
import { db, auth } from '../../config/firebase';
import { getDocs, addDoc, collection, onSnapshot, query, where} from 'firebase/firestore'
import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';


function Comments(){
    const { id } = useParams();

    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([]);

    const commentsCollection = collection(db, 'comments')
    const user = auth.currentUser;
           
    const postComment = async(e) => {
        e.preventDefault();


        await addDoc(commentsCollection, {
            comment_text: comment,
            post_id:id,
            user_id:user.uid,
            username: user.displayName,

        })
    }


    useEffect(() => {
        const commentsQuery = query(collection(db, 'comments'), where('post_id', '==', id));
        const commentsOfPost = onSnapshot(commentsQuery, (snapshot) => {
          const updatedComments = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setComments(updatedComments);
        });
      
        return () => commentsOfPost();
      }, [commentsCollection, id]);


    const handleBackClick = () => {
        window.history.back();
      };

    
    return (
        <section className='comments_section'>
                    <div className='comments_section-nav'>
                        <div className='comments_back'>
                        <button className='button-back 'onClick={handleBackClick}>
                            <img className='comments_section-arrow'src={arrow} alt='back arrow'></img>
                        </button>
                            <p className='back'>Back</p>
                        </div>
                    <h5 className='comments_title'>COMMENTS</h5>
                    </div>
            {comments?.map((comment) =>(
                <>
                    <div className='all_comments'>
                        {/* <img className='comments_section-profile'></img> */}
                        <div className='comments_section-profile'></div>
                            {comment.comment_text && (
                        <div className='all_comments-commentName'>
                                <h6 className='all_comments-name'>{comment.username}</h6>
                                <p className='post-comment'>{comment.comment_text}</p>
                        </div>

                            )}
                            
                    </div>
                </>
            ))}
            <footer className='footer'>
                <textarea className='comment-input' placeholder='Add a comment for ...' onChange={(e) => setComment(e.target.value)}></textarea>
                <button type='buttton'className='button-comment' onClick={postComment}>Post</button>
            </footer>
        </section>
    )
}

export default Comments 