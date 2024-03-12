import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from './Auth';
import {ICONS} from '../../assets/Icons/index';
import {IMAGES} from '../../assets/Images/index';
import AppApi from '../../configurations/Api/AppApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../redux/actions';

const SplashScreen = () => {
  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  useEffect(() => {
    // setTimeout(() => navigation.navigate('IdVerification'), 1500);
    setTimeout(() => navigation.navigate('Welcome'), 1500);

    AppApi.getCurrentUser()
      .then(res => {
        if (res?.status === 200)
          dispatch(authAction.setCurrentUser(res?.data?.response?.data));
      })
      .catch(error => {
        console.log('getCurrentUser', error);
      });
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'light-content'}
        translucent={true}
      />
      <ImageBackground source={IMAGES.splashBG} style={styles.BgImage}>
        <Image source={ICONS.appLogo} style={styles.logo} />
      </ImageBackground>
    </>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  logo: {
    width: 230,
    height: 120,
  },
  BgImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
  },
});
