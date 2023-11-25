import './SignIn.scss';
import logo from '../../images/logo.png';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword  } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SignIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] =  useState('')
    const navigate = useNavigate();

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
            
        </section>
        </>
    )
}

export default SignIn