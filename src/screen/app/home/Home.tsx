import {View, StyleSheet, Platform, StatusBar} from 'react-native';
import React from 'react';
import Button from '../../../components/Button';
import Text from '../../../components/GlobalText';
import colors from '../../../configurations/config/color.config';
import LinearGradient from 'react-native-linear-gradient';
import Avatar from '../../../components/Avatar';
import {DOMAIN_CLOUD_CDN} from '../../../configurations/config/app.config';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../../redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const profileImage: any = `${DOMAIN_CLOUD_CDN}${currentUser?.uuid}/profilePhoto/${currentUser?.avatar}`;

  const profileNavigate = () => navigation.navigate('Profile');
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#EE2150', '#B4173C']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.heading}>
        <StatusBar
          backgroundColor="transparent"
          barStyle={'light-content'}
          translucent={true}
        />
        <View style={styles.row}>
          <Avatar
            WIDTH={50}
            HEIGHT={50}
            src={profileImage}
            PressFunc={profileNavigate}
          />
          <Text style={styles.title}>Hello, Virat</Text>
        </View>
        <View style={styles.design} />
      </LinearGradient>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  heading: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.WHITE_TEXT,
    marginHorizontal: 10,
  },
  design: {
    width: '100%',
    height: 30,
    backgroundColor: colors.WHITE_TEXT,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});
