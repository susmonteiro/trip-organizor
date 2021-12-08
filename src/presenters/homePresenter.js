import React from 'react';
import HomeView from '../views/homeView';

export default function HomePresenter() {
  const REGISTER = 1;
  const LOGIN = 0;
  const [authType, setAuthType] = React.useState(LOGIN);

  const handleChange = (newValue) => {
    setAuthType(newValue);
  };

  return (
    <HomeView
      authType={authType}
      REGISTER={REGISTER}
      LOGIN={LOGIN}
      onChangeAuthType={(newValue) => handleChange(newValue)}
    />
  );
}
