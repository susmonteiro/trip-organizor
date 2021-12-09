import React, { useRef, useState } from 'react';
import HomeView from '../views/homeView';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function HomePresenter(props) {
  //props = userModel
  const [user, setUser] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verify_password, setVerifyPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleLogIn = () => {
    setEmailError('');
    setPasswordError(''); //We reset all the errors
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError('Ups! Something went wrong: ' + err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError('Ups! Something went wrong: ' + err.message);
            break;
        }
      });
  };

  const handleRegister = () => {
    setEmailError('');
    setPasswordError(''); //We reset all the errors
    if (password !== verify_password) {
      setPasswordError("Ups! Your passwords don't match");
      return;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((err) => {
          switch (err.code) {
            case 'auth/invalid-email':
            case 'auth/user-disabled':
            case 'auth/user-not-found':
              setEmailError('Ups! Something went wrong: ' + err.message);
              break;
            case 'auth/wrong-password':
              setPasswordError('Ups! Something went wrong: ' + err.message);
              break;
          }
        });
    }
  };

  //Checks if there is a change in the auth
  function authChange() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setEmail('');
        setPassword('');  //we want to reset the variables
        props.model.setUserID(user.uid); //we put the new userID to the model
      } else {
        setUser('');
      }
    });
  }
  // TODO the log out should be implemented in another view
  // TODO make the login and register views use the functions above 
  // TODO make the firebase read using the userID

  const REGISTER = 1;
  const LOGIN = 0;
  const [authType, setAuthType] = React.useState(LOGIN);
  React.useEffect(() => {
    authChange();
  }, [])
  return <HomeView authType={authType} REGISTER={REGISTER} LOGIN={LOGIN} />;
}
