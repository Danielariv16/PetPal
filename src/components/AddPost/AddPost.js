import Header from '../Header/Header';
import './AddPost.scss';
import share from '../../images/share.png';
import arrow from '../../images/arrow.png';
import { storage } from '../../config/firebase';
import { ref, uploadBytes } from "firebase/storage";
import { useState} from 'react'
import {v4} from 'uuid';
import {collection, addDoc} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { getDownloadURL } from "firebase/storage";


function AddPost(){

    const [uploadImage, setUploadImage] =  useState(null);
    const [description, setDescription] = useState('');

    const postCollection = collection(db , 'Post-Table')
    const user = auth.currentUser;
    

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
                username: user.displayName
            })

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
            <input type='file' className='upload-image' 
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