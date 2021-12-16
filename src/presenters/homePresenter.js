import React, { useRef, useState } from 'react';
import HomeView from '../views/homeView';
import firebase from 'firebase/compat/app';
import { auth } from '../js/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { isLogged } from '../js/models/FirebaseModel';

export default function HomePresenter(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verify_password, setVerifyPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(''); //TODO or delete
  //We want to be without a session when we are at this page
  const REGISTER = '1';
  const LOGIN = '0';
  const [authType, setAuthType] = React.useState(LOGIN);

  function putErrorString(error) {
    switch (error) {
      case 'Firebase: Error (auth/email-already-exists).':
        setError('Email is already in use!');
        break;
      case 'Firebase: Error (auth/invalid-email).':
        setError('Email is invalid!');
        break;
      case 'Firebase: Error (auth/invalid-password).':
        setError('Wrong password!');
        break;
      case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
        setError('Your password must be at least 6 characters');
        break;
      default:
        setError('Your email or password is wrong');
    }
  }
  function login(email, password) {
    setError('');
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      putErrorString(error.message);
    });
  }

  function register(email, password, verify_password) {
    setError('');
    if (password !== verify_password) {
      setError('The passwords are not equal');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        putErrorString(error.message);
      })
      .then(setSuccess('You are logged in! Wait..'));
  }

  function resetError() {
    setError('');
  }

  return (
    <HomeView
      isLogged={isLogged()}
      userid={props.model.currentUser}
      authType={authType}
      REGISTER={REGISTER}
      LOGIN={LOGIN}
      errormsg={error}
      resetError={() => resetError()}
      changeAuthType={(newType) => setAuthType(newType)}
      writeEmail={(email) => setEmail(email)}
      writePassword={(pas) => setPassword(pas)}
      writeVerifyPassword={(pas) => setVerifyPassword(pas)}
      clickLogin={() => login(email, password)}
      clickRegister={() => register(email, password, verify_password)}
    />
  );
}
