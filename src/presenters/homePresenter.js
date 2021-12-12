import React, { useRef, useState } from 'react';
import HomeView from '../views/homeView';
import firebase from 'firebase/compat/app';
import { auth } from '../js/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

export default function HomePresenter(props) { 
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verify_password, setVerifyPassword] = React.useState('');
  const [error, setError] = React.useState('');
  //We want to be without a session when we are at this page
  const REGISTER = '1';
  const LOGIN = '0';
  const [authType, setAuthType] = React.useState(LOGIN);

  function login(email, password) {
    setError('')
    signInWithEmailAndPassword(auth, email, password).catch((error) => setError(error.message));
  }
  
  function register(email, password, verify_password) {
    setError('')
    if (password !== verify_password) {
      setError('The passwords are not equal');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      setError(error.message);
    });
  }
  

  return (
    <HomeView
      userid ={props.model.currentUser}
      authType={authType}
      REGISTER={REGISTER}
      LOGIN={LOGIN}
      errormssg={error}
      changeAuthType={(newType) => setAuthType(newType)}
      writeEmail={(email) => setEmail(email)}
      writePassword={(pas) => setPassword(pas)}
      writeVerifyPassword={(pas) => setVerifyPassword(pas)}
      clickLogin={() => login(email, password)}
      clickRegister={() => register(email, password, verify_password)}
    />
  );
}
