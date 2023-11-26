import Header from '../Header/Header';
import './Porfile.scss';
import porfileEdit from '../../images/edit.png';
import addPic from '../../images/add.png'
import { Link } from 'react-router-dom';
import { db, auth } from '../../config/firebase';
import { getDocs, collection, where, query, 
        doc, updateDoc, getDoc} from 'firebase/firestore'
import {useEffect, useState} from 'react'
import { signOut  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
    
    
    function Porfile(){
        
    const [userName, setUserName ] = useState(null);
    const [name, setName] = useState(null);
    const [userImages, setUserImages] = useState([]);
    const [description, setDescription] =useState(null);
    const [isEditing, setIsEditing] = useState(false);
        
    
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
                const data = await getDocs(usersCollection)      
                const filteredData =  data.docs.map((doc) => 
                    ({...doc.data(), 
                        id: doc.id
                    }))
                const currentUser =  filteredData.find((userData) => userData.email === user?.email)

                const userDocRef = doc(db, 'users', currentUser.id);
                const userDocSnapshot = await getDoc(userDocRef);
                const userData = userDocSnapshot.data();
    
                if (userData) {
                    await updateDoc(userDocRef, {
                        description: description,
                        full_name: name
                    });
                    console.log('Profile updated successfully');
                } 
            } 

        catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    
    
    return (
        <>
        <Header />
        <section className='porfile_section'>
            <div className='porfile_section-container1'>
                <div className='porfile_section-aboutYou'>
                    <h4 className='porfile_section-username'>{userName}</h4>
                    {
                        isEditing? (
                            <>
                                <input className='input-name' onChange={(e) => setName(e.target.value)}></input>
                                <input className='input-description'
                                onChange={(e) => {setDescription(e.target.value)}}>
                                </input>
                            </>

                        ) :(
                            <>
                                <h3 className='porfile-sec-name'>{name}</h3>
                                <p className='porfile_section-about'>{description}</p>
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
                    {
                        isEditing && (
                            <button className='save-edit' 
                            onClick={saveChanges}>Save</button>
                            
                            )
                            
                        }
                </div>
                <div className='porfile_section-porfilePic'>
                    <div  className='porfile_section-pic'></div>
                    {/* <img className='porfile_section-pic'></img> */}
                    <button onClick={logout}>Log out</button>
                </div>
            </div>
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