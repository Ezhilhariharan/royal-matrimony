import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {ICONS} from '../../assets/Icons';
import Text from '../../components/GlobalText';

interface profile {
  text1?: string;
  text2?: string;
  src?: any;
}

const ProfileMiniIcon = ({text1, text2, src}: profile) => {
  return (
    <View style={styles.iconsContainer}>
      <Image source={src} style={styles.miniIcon} />
      <Text style={styles.miniText}>{text1}</Text>
      <Text style={styles.miniText}>{text2}</Text>
    </View>
  );
};

export default ProfileMiniIcon;

const styles = StyleSheet.create({
  miniIcon: {
    width: 25,
    height: 25,
    marginBottom: 3,
  },
  miniText: {
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
    color: '#535353',
  },
  iconsContainer: {
    width: 45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
