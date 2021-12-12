import React, { useRef, useState } from 'react';
import HomeView from '../views/homeView';
import firebase from 'firebase/compat/app';
import { login, register } from '../js/models/FirebaseModel';

export default function HomePresenter(props) {
  //props = userModel
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verify_password, setVerifyPassword] = React.useState('');

  const REGISTER = '1';
  const LOGIN = '0';
  const [authType, setAuthType] = React.useState(LOGIN);

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
