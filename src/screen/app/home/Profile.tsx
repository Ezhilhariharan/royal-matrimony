import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from '../../../components/GlobalText';
import colors from '../../../configurations/config/color.config';
import {DOMAIN_CLOUD_CDN} from '../../../configurations/config/app.config';
import AppApi from '../../../configurations/Api/AppApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/app/AppHeader';
import ProfileMiniCom from '../../../components/app/ProfileMiniIcon';
import ProfileCircleCom from '../../../components/app/ProfileCircleIcon';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import {ProfileMini, ProfileCircle} from '../../../utilis/staticData/Profile';
import {ICONS} from '../../../assets/Icons';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../../redux/actions';

const Profile = () => {
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);

  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const profileImage: any = `${DOMAIN_CLOUD_CDN}${currentUser?.uuid}/profilePhoto/${currentUser?.avatar}`;

  const Logout = () => {
    AppApi.signOut()
      .then(res => {
        if (res?.status === 200) {
          dispatch(authAction.setLogin(false));
          AsyncStorage.setItem('token', '');
        }
      })
      .catch(error => {
        console.log('signOut', error);
      });
  };

  const navFunc = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Header title="Profile" navFunc={navFunc} ShowLeftIcon={true} />
      <View style={styles.profile}>
        <View style={styles.imageContainer}>
          <Image source={{uri: profileImage}} style={styles.profilePic} />

          <TouchableOpacity style={styles.editIcon}>
            <Image source={ICONS.edit} style={styles.profilePicEdit} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>
          {currentUser?.firstName} {currentUser?.lastName}
        </Text>
        <View style={[styles.row, {width: '50%'}]}>
          {ProfileMini?.map((item: any) => (
            <ProfileMiniCom
              text1={item?.text1}
              text2={item?.text2}
              src={item?.src}
              key={item?.id}
            />
          ))}
        </View>
      </View>
      <View style={styles.navigationContainer}>
        {ProfileCircle?.slice(0, 3).map((item: any) => (
          <ProfileCircleCom
            text1={item?.text1}
            src={item?.src}
            key={item?.id}
          />
        ))}
      </View>
      <View style={styles.navigationContainer}>
        {ProfileCircle?.slice(3, 6).map((item: any) => (
          <ProfileCircleCom
            text1={item?.text1}
            src={item?.src}
            key={item?.id}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={Logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.P_TEXT,
  },

  logoutText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.SECONDARY_COLOR,
  },
  profilePic: {
    width: 160,
    height: 160,
    borderRadius: 100,
    marginVertical: 10,
  },
  profilePicEdit: {
    width: 32,
    height: 32,
  },
  editIcon: {
    position: 'absolute',
    bottom: 15,
    right: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  profile: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  navigationContainer: {
    flex: 0.18,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  footer: {
    flex: 0.2,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
