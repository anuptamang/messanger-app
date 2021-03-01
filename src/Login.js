import React from 'react'
import { auth, provider } from './firebase'
import imgMessanger from './assets/images/messanger.webp'


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
    <div className="webpage bg-gray-700 relative top-0 left-0 w-full h-screen flex items-center justify-center">
      <div className="bg-gray-500 rounded-lg p-5 w-96 text-center">
        <h1 className="text-xl md:text-3xl font-extrabold mb-5 pt-5 text-center flex items-center justify-center text-white">
          <div className="img mr-2">
            <img src={imgMessanger} width="100" height="100" alt="" />
          </div>
          Messanger App
        </h1>
        <button className="text-2xl text-white rounded-md py-3 px-6 bg-blue-400" onClick={signIn}>
          Sign in
        </button>
      </div>
    </div>
  )
}

export default Login