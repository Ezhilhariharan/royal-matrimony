import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

interface avatarProps {
  WIDTH?: number;
  HEIGHT?: number;
  src?: any;
  PressFunc?: () => void;
}

const Avatar = ({WIDTH, HEIGHT, src, PressFunc}: avatarProps) => {
  return (
    <TouchableOpacity onPress={PressFunc}>
      <Image
        source={{uri: src}}
        style={{height: HEIGHT, width: WIDTH, borderRadius: 100}}
      />
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({});
