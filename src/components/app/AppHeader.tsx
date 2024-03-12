import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import Text from '../../components/GlobalText';
import {ICONS} from '../../assets/Icons';
import colors from '../../configurations/config/color.config';
import Avatar from '../../components/Avatar';
import {DOMAIN_CLOUD_CDN} from '../../configurations/config/app.config';

interface header {
  title?: string;
  navFunc?: () => void;
  ShowLeftIcon?: boolean;
  ShowRightIcon?: boolean;
  ShowProfile?: boolean;
  profileNav?: () => void;
}

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../redux/actions';

const AppHeader = ({
  title,
  navFunc,
  ShowLeftIcon,
  ShowRightIcon,
  ShowProfile,
  profileNav,
}: header) => {
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);
  const profileImage: any = `${DOMAIN_CLOUD_CDN}${currentUser?.uuid}/profilePhoto/${currentUser?.avatar}`;

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'dark-content'}
        translucent={true}
      />
      <View style={styles.heading}>
        <View style={[styles.center, {width: '15%'}]}>
          {ShowLeftIcon && (
            <TouchableOpacity onPress={navFunc}>
              <Image source={ICONS.appBack} style={styles.navigationStyle} />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.center, {width: '70%'}]}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={[styles.center, {width: '15%'}]}>
          {ShowRightIcon &&
            (ShowProfile ? (
              <Avatar
                WIDTH={40}
                HEIGHT={40}
                src={profileImage}
                PressFunc={profileNav}
              />
            ) : (
              <TouchableOpacity onPress={navFunc}>
                <Image source={ICONS.dots} style={styles.navigationStyle} />
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  heading: {
    flex: 0.1,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationStyle: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.P_TEXT,
  },
});
