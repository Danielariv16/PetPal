import './SignIn.scss';
import logo from '../../images/logo.png';
import { auth, googleProvider, db } from '../../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {collection, addDoc} from 'firebase/firestore';



function SignIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] =  useState('')
    const navigate = useNavigate();

    const usersCollection = collection(db , 'users')

  



    const signIn = (e) =>{
        e.preventDefault()
        try {
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                navigate('/');

              })
              

              console.log('sign in sucessful')
              
            }
            catch (err) {
                console.error(err)
            }
        } 

        const loginWithGoogle = async() => {
            try {
                const userCredential = await signInWithPopup(auth, googleProvider);
                const user = userCredential.user;

                
                await addDoc(usersCollection, 
                    {
                        displayName: user.displayName, 
                        email: user.email, 
                    })
                    .then((userCredential) => {
                        navigate('/');
        
                      })
    
                  console.log('sign in sucessful')
            }
            catch(err) {
                console.error(err)
            }
        }

        console.log(auth?.currentUser?.displayName)
        


    return(
        <>
        <section className='sign_in'>
            <img src={logo} className='sign_in-logo'></img>
            <input name='email' className='sign_in-email' 
            placeholder='Username, or email' 
            onChange={(e)=> setEmail(e.target.value)}>
            </input>
            <input name='password' 
            className='sign_in-password' 
            placeholder='Password' 
            type='password'
            onChange={(e)=> setPassword(e.target.value)}>
            </input>
            <button className='sign_in-logIn'
            onClick={signIn}>Log in</button>
            <p className='sign_in-or'>━━━━━ or ━━━━━</p>
            <div className='sign_in-google'>
                <button className='sign_in-question' onClick={loginWithGoogle}>Log in with Google</button>
            </div>
            
        </section>
        </>
    )
}

export default SignIn