
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { userContext } from '../../App';



const Login = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  };

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [logInUser,setLogInUser]=useContext(userContext);
  const [newUser,setNewUser]=useState(false);
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    isSignIn:false,
    confirm:"",
    error:"",
    PickFrom:"",
    PickTo:"",
    success:false
  })
  const  googleProvider = new firebase.auth.GoogleAuthProvider();
  var facebookProvider = new firebase.auth.FacebookAuthProvider();
  const handleGoogleSignIn=()=>{
    
    firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
              const {displayName,email,password,error}=result.user;
              const  googleSignInUser ={
                name:displayName,
                email:email,
                password:password,
                error:error,
                success:true,
              }
              const newUserInfo={...user};
              newUserInfo.error="";
              newUserInfo.success=true;
              setUser(newUserInfo);
              setLogInUser(googleSignInUser)
              history.replace(from);
            }).catch((error) => {
              const newUserInfo={...user};
              newUserInfo.success=false;
              newUserInfo.error=error.message;
              setUser(newUserInfo);
      });
  }


//email and password 
const handleBlur=(e)=>{
    let isFieldValid=true;
    if(e.target.name==="email"){
      isFieldValid=/\S+@\S+\.\S+/.test(e.target.value);
      console.log(isFieldValid)
    }
    if(e.target.name==="password"){
      isFieldValid=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(e.target.value)
      console.log(isFieldValid)
    }

   if(isFieldValid){
     const newUserInfo={...user};
     newUserInfo[e.target.name]=e.target.value;
     setUser(newUserInfo);
     setLogInUser(newUserInfo);
     
   }
}
const handleSubmit=(e)=>{
  if ( newUser && user.email && user.password) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then((userCredential) => {
            const newUserInfo={...user};
            newUserInfo.error="";
            newUserInfo.success=true;
            newUserInfo[e.target.name]=e.target.value;
            setUser(newUserInfo);
            setLogInUser(newUserInfo);
            updateUserName(user.name);
            console.log(logInUser.name);
          })
          .catch((error) => {
            const newUserInfo={...user};
            newUserInfo.success=false;
            newUserInfo.error=error.message;
            setUser(newUserInfo);
          });
  }

  if (!newUser && user.email && user.password) {
          firebase.auth().signInWithEmailAndPassword(user.email,user.password)
        .then((userCredential) => {
          const {displayName,email,password,error}=userCredential.user;
          const  emailSignInUser ={
            name:displayName,
            email:email,
            password:password,
            success:true,
          }
            const newUserInfo={...user};
            newUserInfo.error="";
            newUserInfo.success=true;
            setUser(newUserInfo);
            setLogInUser(emailSignInUser);
            console.log("ans :",emailSignInUser);
            history.replace(from);
            console.log(emailSignInUser.name);
        })
        .catch((error) => {
          const newUserInfo={...user};
          newUserInfo.success=false;
          newUserInfo.error=error.message;
          setUser(newUserInfo);
        });
  }
  e.preventDefault();
}
const updateUserName=(name)=>{
  var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName:name,

      }).then(function() {
        const newUserInfo={...user};
        newUserInfo.error="";
        newUserInfo.success=true;
        setUser(newUserInfo);
        setLogInUser(newUserInfo);
      }).catch(function(error) {
        const newUserInfo={...user};
        newUserInfo.success=false;
        newUserInfo.error=error.message;
        setUser(newUserInfo);
      });
      }
//facebook log in
const handleFacebookSignIn=()=>{
  firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then((result) => {
          const {displayName,email,password,error}=result.user;
              const  facebookSignInUser ={
                name:displayName,
                email:email,
                password:password,
                error:error,
                success:true,
              }
            const newUserInfo={...user};
            newUserInfo.error="";
            newUserInfo.success=true;
            setUser(newUserInfo);
            setLogInUser(facebookSignInUser);
            history.replace(from);
        })
        .catch((error) => {
          const newUserInfo={...user};
          newUserInfo.success=false;
          newUserInfo.error=error.message;
          setUser(newUserInfo);
        });
}

    return (
        <div className="container ">
          <div className="loginContainer">
            <form onSubmit={handleSubmit}>
                    {newUser ? <h2>Create an account</h2> : <h2>Login</h2> }
                      {newUser && <input onBlur={handleBlur} name="name" type="text" required placeholder="Name" /> } <br/>

                      <input onBlur={handleBlur} name="email" type="text"  required placeholder="Email" /> <br/>
                      
                      <input onBlur={handleBlur} name="password" type="password" required placeholder="Password" /> <br/>

                      {newUser && <input onBlur={handleBlur} name="confirmPassword" required type="password" placeholder="Confirm Password" />} <br/>
                   
                  <div className="d-flex justify-content-between checkBox bg-danger p-3">
                    <div className=" w-25 d-flex justify-content-evenly">
                        <input onChange={()=>setNewUser(!newUser)} type="checkbox" name="newUser"/>
                        <label htmlFor="newUser">Remember</label>
                    </div>
                    <div>
                      <a href="">Password Forget</a>
                    </div>
                  </div>

                  {newUser ? <button onSubmit={handleSubmit} className="py-2 bg-success " value="submit"  type="submit">Create an account</button>: <button onSubmit={handleSubmit}  className=" my-2 py-2 bg-success"  type="submit">Login</button>}
                  <p>Already have an account? <Link to="/login">{newUser? <span>Login</span>: <span>create an account</span> }</Link></p>
            </form>
            <p style={{color:"red"}}>{user.error}</p> 
            {user.success && <p style={{color:'green'}}>user {newUser?" create":"login"} success full </p> }
            <p>or</p>
            <Button className=" py-3" onClick={handleGoogleSignIn} variant="primary rounded-pill" size="lg" block>
            <FontAwesomeIcon className="fs-1 mx-5" icon={faGoogle} /> Continue with Google 
            </Button>
            <Button  className=" py-3" onClick={handleFacebookSignIn} variant="primary rounded-pill " size="lg" block>
            <FontAwesomeIcon className="fs-1 mx-5" icon={faFacebook} />  Continue with Facebook
            </Button>
        </div>
        </div>
    );
};

export default Login;