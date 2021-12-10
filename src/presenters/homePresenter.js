import React, { useRef, useState } from 'react';
import HomeView from '../views/homeView';
import firebase from 'firebase/compat/app';
import { login, register } from '../js/models/FirebaseModel';

export default function HomePresenter(props) {
  //props = userModel
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verify_password, setVerifyPassword] = React.useState('');
  //const [emailError, setEmailError] = React.useState('');
  //const [passwordError, setPasswordError] = React.useState('');

  /*
  //Checks if there is a change in the auth
  function authChange() {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setEmail('');
        setPassword(''); //we want to reset the variables
        props.model.setUserID(user.uid); //we put the new userID to the model
      } else {
        setUser('');
      }
    });
    return unsubscribe;
  } */
  // TODO the log out should be implemented in another view
  // TODO make the login and register views use the functions above
  // TODO make the firebase read using the userID

  const REGISTER = '1';
  const LOGIN = '0';
  const [authType, setAuthType] = React.useState(LOGIN);

  /*
  React.useEffect(() => {
    authChange();
  }, []);
 */
  return (
    <HomeView
      userid ={props.model.currentUser}
      authType={authType}
      REGISTER={REGISTER}
      LOGIN={LOGIN}
      changeAuthType={(newType) => setAuthType(newType)}
      writeEmail={(email) => setEmail(email)}
      writePassword={(pas) => setPassword(pas)}
      writeVerifyPassword={(pas) => setVerifyPassword(pas)}
      clickLogin={() => login(email, password)}
      clickRegister={() => register(email, password, verify_password)}
    />
  );
}
