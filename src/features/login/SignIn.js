import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './SignIn.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

  const changeEmail = (event) => {
    setEmail(event.target.value);
  }

  const changePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("SUCCESS!");
      navigate('/dashboard');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error code: ${errorCode} \n Error Message: ${errorMessage}`);

      switch(errorMessage) {
        case 'Firebase: Error (auth/invalid-email)':
          setError('Invalid email');
          break;
        case 'Firebase: Error (auth/wrong-password)':
          setError('Invalid password');
          break;
        default:
          setError('Oops, there seems to be an error. Please try again.');
          break;
      }
      navigate('/');
    });
    

  }



  return (
    <div className='login'>
        <form method='post' onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <section className='login-inputs'>
            <input name='email' type='email' placeholder='Email' onChange={changeEmail} />
            <input name='password' type='password' placeholder='Password' onChange={changePassword} />
          </section>
          <button type='submit'>Sign In</button>
          <p>{error}</p>
        </form>
    </div>
  )
}

export default Login