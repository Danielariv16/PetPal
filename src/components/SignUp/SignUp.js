import './SignUp.scss';
import logo from '../images/logo.png';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth'
import { useState } from 'react';
import { Link } from "react-router-dom";
import {getDocs, collection, addDoc} from 'firebase/firestore';


function SignUp(){
    const [newemail, setNewEmail] = useState('');
    const [newpassword, setNewPassword] =  useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newName, setNewName] = useState('')

     const usersCollection = collection(db , 'users')
     
     
     
     const signUp = async () =>{
         try{
            const userCredential = await createUserWithEmailAndPassword(auth, newemail, newpassword);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: newUsername,
              });
          

            await addDoc(usersCollection, 
                {
                displayName: newUsername, 
                email: newemail, 
                full_name: newName, 
                password: newpassword
            })

            createUserWithEmailAndPassword(auth, newemail, newpassword,newUsername, newName )
              .then((userCredential) => {
              })
        }
        catch (err) {
            console.error(err)
        }
    } 


    return (
        <>
         <section className='sign_in'>
            <img src={logo} className='sign_in-logo'></img>
            <input name='email' className='sign_in-email2' 
            placeholder='Email' 
            onChange={(e)=> setNewEmail(e.target.value)}>
            </input>
            <input name='name' className='sign_in-name' 
            placeholder='Full Name'
            onChange={(e)=> setNewName(e.target.value)} >
            </input>
            <input name='username' className='sign_in-username' 
            placeholder='Username' 
            onChange={(e)=> setNewUsername(e.target.value)}>
            </input>
            <input name='password' 
            className='sign_in-password' 
            placeholder='Password' 
            type='password'
            onChange={(e)=> setNewPassword(e.target.value)}>
            </input>
            <button className='sign_in-logIn'
            onClick={signUp}>Sign Up</button>

            <div className='existing_user'>
                <p className='existing_user-des'>Have an account?</p>
                <Link to='/sign-in'>
                    <p className='Log-In'>Log in</p>

                </Link>

            </div>
           
        </section>
        </>
    )
}

export default SignUp