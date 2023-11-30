import Header from '../Header/Header';
import './AddPost.scss';
import share from '../../images/share.png';
import arrow from '../../images/arrow.png';
import upload from '../../images/upload.png';
import { storage } from '../../config/firebase';
import { ref, uploadBytes } from "firebase/storage";
import { useState} from 'react'
import {v4} from 'uuid';
import {collection, addDoc, getDocs} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';



function AddPost(){

    const [uploadImage, setUploadImage] =  useState(null);
    const [description, setDescription] = useState('');
    const [currentUser, setCurrentUser] = useState(null)

    const postCollection = collection(db , 'Post-Table')
    const usersCollection = collection(db, 'users')
    const user = auth.currentUser;

    const navigate = useNavigate();

    
    const photo = async()=> {
        const data = await getDocs(usersCollection);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

         const currentUser = filteredData.find((userData) => userData.email === user?.email);
         setCurrentUser(currentUser)
    }
    photo()


    const imageUpload = async () => {
        if(uploadImage == null) return

        const homeImagesRef = ref(storage, `imagesHome/ ${uploadImage.name + v4()}`)
        try {
            await uploadBytes(homeImagesRef, uploadImage)
            const uploadUrl =  await getDownloadURL(homeImagesRef)

            await addDoc(postCollection,{
                caption: description,
                user_id: user.uid,
                image_url: uploadUrl,
                username: user.displayName,
                porfilePic: currentUser.photoURL,
                likes: ''
            })
            navigate('/');

        }

        catch (err){
            console.error(err)
        }
    }
    

    const handleBackClick = () => {
        window.history.back();
          };

    return (
        <>
        <Header />
        <div className='comments_back'>
            <button className='button-back 'onClick={handleBackClick}>
                <img className='comments_section-arrow'src={arrow}
                    alt='back arrow'>
                 </img>
            </button>
            <p className='back'>Back</p>
        </div>

        <section className='add_post'>
            <h6 className='add_post-addImg'>ADD YOUR IMAGE</h6>
            <label id='file-label' htmlFor='file' >
                <img src={upload} alt='upload your image'></img>
            </label>
                <input name='file' type='file' id='file' className='upload-image' 
                    onChange={(e) => {setUploadImage(e.target.files[0])}}>
                </input>
            <h6 className='add_post-addDesc'>ADD DESCRIPTION</h6>
            <textarea className='add_post-desc' onChange={(e) => {setDescription(e.target.value)}}></textarea>
            <button className='add_post-share'onClick={imageUpload}>Share <img src={share} className='share-image'></img></button>

        </section>
        </>
    )
}

export default AddPost