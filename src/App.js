import React, { useState } from 'react';
import './App.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
// firebaseConfig
import firebaseConfig from './firebase.config';


firebase.initializeApp(firebaseConfig)

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handelSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName,email,photoURL} = res.user
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
    setUser(signedInUser)

      // console.log(displayName,email,photoURL);

    })
    .catch(err => {
      console.log(err);
      console.log(err.message)
    })
  }
  const handelSignOut = () => {
    // console.log('User Sign Out');
    firebase.auth().signOut()
    .then(() => {
      const sigedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(sigedOutUser)
    })
    .catch((err => {

    }))
  }

  const handelBlur = (e) => {
    debugger;
    let isFormValid = true;
    // console.log(e.target.name, e.target.value);
    if(e.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
     
    }
    if(e.target.name === 'password'){
      isFormValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(e.target.value);
      
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;  
      setUser(newUserInfo);
    }
  }

  const handelSubmit = () => {

  }
  return (
    <div className="App">
      {
          user.isSignedIn ?  <button onClick={handelSignOut}>Sign Out</button> : 
          <button onClick={handelSignIn}>Sign in</button>
      }
    
     {
       user.isSignedIn && <div>
         <p>Welcome, {user.name}</p>
         <p>Email, {user.email}</p>
         <img src={user.photo} alt=""/>
       </div>
     }
     <div>
       <h1>Our own Authenticaion</h1>
       <p>Email: {user.email}</p>
       <p>Password: {user.password}</p>
       <form onSubmit={handelSubmit}>
         <input type="text" name="email" id="" onBlur={handelBlur} placeholder="Your E-mail" required/>
         <br/>
         <input type="password" name="password" id="" onBlur={handelBlur} placeholder="Your passwor" required/>
         <br/>
         <input type="submit" value="Submit"/>
       </form>
     </div>
    </div>
  );
}

export default App;
