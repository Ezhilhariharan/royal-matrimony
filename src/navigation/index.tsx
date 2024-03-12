import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '../screen/auth/Auth';
// import AppStack from '../screen/app/App';
import AppStack from './tabs/MainTab';

//redux
import {useSelector} from 'react-redux';

const index = () => {
  const isLogged = useSelector((state: any) => state.auth.is_logged);

  return (
    <NavigationContainer>
      {isLogged ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default index;
