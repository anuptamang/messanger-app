import React from 'react'
import { auth, provider } from './firebase'


function Login(props) {
  const signIn = () => {
     auth.signInWithPopup(provider)
      .then(result => {
        const newUser = {
          name: result.user.displayName,
          photo: result.user.photoURL
        }
        localStorage.setItem('user', JSON.stringify(newUser))
        props.setUser(newUser)
      })
      .catch(error => {
        alert(error.message)
      })
  }
  
  return (
    <div className="">
      <button onClick={signIn}>
        login
      </button>
    </div>
  );
}

export default Login