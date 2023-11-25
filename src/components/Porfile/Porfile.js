import Header from '../Header/Header';
import './Porfile.scss';
import porfileEdit from '../../images/edit.png';
import addPic from '../../images/add.png'
import { Link } from 'react-router-dom';
import { db, auth } from '../../config/firebase';
import { getDocs, collection, where, query} from 'firebase/firestore'
import {useEffect, useState} from 'react'
import { signOut  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';




function Porfile(){
    const [userName, setUserName ] = useState(null);
    const [userImages, setUserImages] = useState([]);


    const usersCollection = collection(db, 'users')
    
    const navigate = useNavigate(); 
    const user = auth.currentUser;
    
    useEffect(() => {
        const response = async () => {
                try {
                const data = await getDocs(usersCollection)
                const filteredData =  data.docs.map((doc) => 
                ({...doc.data(), 
                    id: doc.id
                }))
                const currentUser =  filteredData.find((userData) => userData.email === user?.email)
                setUserName(currentUser?.full_name)
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


    return (
        <>
        <Header />
        <section className='porfile_section'>
            <div className='porfile_section-container1'>
                <div className='porfile_section-aboutYou'>
                    <h4 className='porfile_section-name'>{userName}</h4>
                    <p className='porfile_section-about'>
                        Major es amante a cazar, le gusta dormir y comer mucho
                    </p>
                </div>
                <div className='porfile_section-porfilePic'>
                    <div  className='porfile_section-pic'></div>
                    {/* <img className='porfile_section-pic'></img> */}
                    <button onClick={logout}>Log out</button>
                </div>
            </div>
                <div className='porfile_section-buttons'>
                    <img className='porfile_section-edit' src={porfileEdit}></img>
                    <Link to={'/add-post'}>
                        <img className='porfile_section-add' src={addPic}></img>
                    </Link>
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