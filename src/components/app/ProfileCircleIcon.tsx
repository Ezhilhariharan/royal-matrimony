import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import colors from '../../configurations/config/color.config';
import Text from '../../components/GlobalText';

interface profile {
  text1?: string;
  src?: any;
}

const ProfileCircleIcon = ({text1, src}: profile) => {
  return (
    <View style={styles.circleContainer}>
      <View style={styles.iconsBorder}>
        <Image source={src} style={styles.circleIcon} />
      </View>
      <Text style={styles.navTitle}>{text1}</Text>
    </View>
  );
};

export default ProfileCircleIcon;

const styles = StyleSheet.create({
  iconsBorder: {
    borderWidth: 1,
    borderColor: colors.BORDER_LINE,
    width: 75,
    height: 75,
    borderRadius: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: 110,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleIcon: {
    width: 30,
    height: 30,
  },
  navTitle: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#535353',
  },
});
