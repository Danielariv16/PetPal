import './SignIn.scss';
import logo from '../images/logo.png';

function SignIn(){
    return(
        <>
        <section className='sign_in'>
            <img src={logo} className='sign_in-logo'></img>
            <input name='email' className='sign_in-email' placeholder='Username, or email'></input>
            <input name='password' className='sign_in-password' placeholder='Password'></input>
            <button className='sign_in-logIn'>Log in</button>
            <p className='sign_in-or'>━━━━━ or ━━━━━</p>
        </section>
        </>
    )
}

export default SignIn