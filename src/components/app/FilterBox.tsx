import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import Text from '../../components/GlobalText';
import colors from '../../configurations/config/color.config';
import LinearGradient from 'react-native-linear-gradient';
import {ICONS} from '../../assets/Icons';

interface box {
  startColor?: string;
  endColor?: string;
  src?: any;
  title?: string;
}

const FilterBox = ({startColor, endColor, src, title}: box) => {
  return (
    <LinearGradient
      colors={[`${startColor}`, `${endColor}`]}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={styles.boxContainer}>
      <Image source={src} style={styles.Icon} />
      <Text style={styles.title}>{title}</Text>
    </LinearGradient>
  );
};

export default FilterBox;

const styles = StyleSheet.create({
  boxContainer: {
    width: '45%',
    height: 75,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 3,
    color: colors.WHITE_TEXT,
  },
  Icon: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
  },
});
