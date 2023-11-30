import Header from '../Header/Header';
import './Porfile.scss';
import porfileEdit from '../../images/edit.png';
import addPic from '../../images/add.png'
import { Link } from 'react-router-dom';
import { db, auth, storage } from '../../config/firebase';
import { getDocs, collection, where, query, 
        doc, updateDoc, getDoc} from 'firebase/firestore'
import {useEffect, useState} from 'react'
import { signOut  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import upload from '../../images/upload.png';

    
function Porfile(){
        
    const [userName, setUserName ] = useState(null);
    const [name, setName] = useState(null);
    const [userImages, setUserImages] = useState([]);
    const [description, setDescription] =useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [porfilePic, setPorfilePic] = useState(null)
        
    
    const usersCollection = collection(db, 'users')
    const navigate = useNavigate(); 
    const user = auth.currentUser;
    
    const startEditing = () => {
        setIsEditing(true);
    };
    const saveChanges = async () => {
        updatePorfile();
        setIsEditing(false);
    };

    const cancelChanges = () => {
        setIsEditing(false)
    }
    
    const logout = async () => {
        try {
            await signOut(auth).then(() => {
                navigate('/sign-in');
              })
        }
        catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const response = async () => {
                try {
                const data = await getDocs(usersCollection)
                const filteredData =  data.docs.map((doc) => 
                ({...doc.data(), 
                    id: doc.id
                }))
                const currentUser =  filteredData.find((userData) => userData.email === user?.email)
                setUserName(currentUser?.displayName)
                setDescription(currentUser?.description); 
                setName(currentUser?.full_name)
                setPorfilePic(currentUser?.photoURL)
            }
            catch(err) {
                console.error(err)
            }
        }
        response()
    }, [])

    useEffect(() => {
        const imagesOfUser = async () => {
            try {
                const userImagesQuery = query(collection(db, 'Post-Table'), where('user_id', '==', user.uid));
                const userImagesSnapshot = await getDocs(userImagesQuery);
                const imageUrls = userImagesSnapshot.docs.map(doc => doc.data().image_url);

                setUserImages(imageUrls)

            } catch (error) {
                console.error('Error getting images:');
            }
        };
    
        imagesOfUser();
    }, []);
    

const updatePorfile = async () => {
    try {
        const data = await getDocs(usersCollection);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        const currentUser = filteredData.find((userData) => userData.email === user?.email);

        const userDocRef = doc(db, 'users', currentUser.id);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();

        if (userData) {
            if (porfilePic) {
                const porfileImagesRef = ref(storage, `porfilePics/${user.uid}`);
                await uploadBytes(porfileImagesRef, porfilePic);

                const downloadURL = await getDownloadURL(porfileImagesRef);

                await updateDoc(userDocRef, {
                    description: description,
                    full_name: name,
                    photoURL: downloadURL
                });

            }
            if (name !== currentUser?.full_name || description !== currentUser?.description ) 
            
            {

                await updateDoc(userDocRef, {
                    description: description,
                    full_name: name
                });
            } 

            console.log('Profile updated successfully');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
    }
};



    
    
    return (
        <>
        <Header />
        <section className='porfile_section'>

                    {
                        isEditing? (
                            <>
                            <div className='edit'>
                                <div className='edit-section'>
                                    <input className='input-name' 
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Update your name'>
                                    </input>
                                    <textarea className='input-description'
                                    onChange={(e) => {setDescription(e.target.value)}}
                                    placeholder='Update your about me'>
                                    </textarea>
                                    <div className='edit-buttons'>
                                    {
                                        isEditing && (
                                            <>
                                            
                                            <button className='save-edit' 
                                            onClick={saveChanges}>Save</button>
                                            <button className='cancel-edit'
                                            onClick={cancelChanges}>Cancel</button>
                                            </>
                                                )  
                                            }
                                        </div>
                                </div>
                                <label id='porfileFile-label' htmlFor='filePorfile'>
                                    <input name='filePorfile' id='filePorfile' type='file' className='upload-porfile-image' 
                                        onChange={(e) => {setPorfilePic(e.target.files[0])}}>
                                    </input>
                                    <img src={upload} alt='upload your image'></img>
                                </label>
                            </div>

                            </>

                        ) :(
                            <>
                        <div className='porfile_section-container1'>

                            <div className='porfile_section-porfilePic'>
                                <img className='porfile_section-pic' src={porfilePic} alt='porfilePic'></img>
                                <p className='porfile_section-username'>{userName}</p>
                                <button className='porfile_section-logout'onClick={logout}>Log out</button>
                            </div>
                            <div className='porfile_section-aboutYou'>

                                <h3 className='porfile-sec-name'>{name}</h3>
                                <p className='porfile_section-about'>{description}</p>

                            </div>
                                    </div>
                                <div className='porfile_section-buttons'>
                                    <img className='porfile_section-edit' 
                                        src={porfileEdit}
                                        onClick={startEditing}>
                                    </img>
                                    <Link to={'/add-post'}>
                                        <img className='porfile_section-add' src={addPic}></img>
                                    </Link>
                                </div>
                            </>
                        )
                    }

                <section className='pictures'>
                {
                    userImages?.map((image) =>(
                        <img className='images' src={image}></img>
                        
                    ))
                }
                </section>
        </section>
        </>
    )
}

export default Porfile