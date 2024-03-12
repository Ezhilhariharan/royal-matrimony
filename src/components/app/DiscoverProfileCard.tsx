import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import colors from '../../configurations/config/color.config';
import Text from '../../components/GlobalText';

interface profile {
  text1?: string;
  src?: any;
}

const DiscoverProfileCard = ({text1, src}: profile) => {
  return (
    <View style={styles.circleContainer}>
      <Image source={src} style={styles.circleIcon} />
      <Text style={styles.navTitle}>{text1}</Text>
    </View>
  );
};

export default DiscoverProfileCard;

const styles = StyleSheet.create({
  circleContainer: {
    width: 110,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleIcon: {
    width: 50,
    height: 50,
  },
  navTitle: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#535353',
  },
});
