import {
  View,
  TextInput,
  ViewStyle,
  StyleSheet,
  Image,
  TextInputProps,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/GlobalText';
import {ICONS} from '../assets/Icons';
import color from '../configurations/config/color.config';

interface ITextInput {
  placeholder?: string;
  label?: string;
  backIcon?: any;
  frontIcon?: any;
  editable?: boolean;
  showLabel?: boolean;
  value?: any;
  error?: string;
  activeIcon: (text: string) => void;
  showHideControll?: boolean;
  styleContainer?: ViewStyle;
  multpileline?: boolean;
  width?: any;

  // type?: any;
  // height?: any;
  // showEye?: boolean;
}

const TextInputCustom = ({
  label,
  placeholder,
  backIcon,
  onChangeText,
  frontIcon,
  showLabel = true,
  keyboardType,
  error,
  value,
  activeIcon,
  editable,
  showHideControll,
  styleContainer,
  width,
  multpileline,
  ...rest
}: TextInputProps & ITextInput) => {
  const [showEye, setShowEye] = useState<boolean>(false);

  const pressAction = () => {
    let name: any = label;
    activeIcon(name);
  };

  useEffect(() => {
    securityTextHandle();
  }, [showEye]);

  const securityTextHandle = () => {
    if (showHideControll) {
      if (showEye) return false;
      return true;
    } else {
      // if (label === "Password") return true
      // if (label === "Confirm Password") return true
      // return false
    }
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.inputContainer,
          styleContainer,
          {height: multpileline ? 200 : 55},
        ]}>
        {showLabel && <Text style={styles.label}>{label}</Text>}
        {frontIcon && (
          <View style={styles.viewContainer}>
            <Image source={frontIcon} style={styles.iconCalender} />
          </View>
        )}
        <TextInput
          editable={editable}
          placeholder={placeholder}
          style={[
            styles.textInput,
            {
              width: width ? width : frontIcon ? 250 : 315,
              paddingHorizontal: frontIcon ? 10 : 23,
            },
          ]}
          onChangeText={onChangeText}
          onPressIn={pressAction}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={securityTextHandle()}
          {...rest}
        />
        {backIcon && label === 'Date OF Birth' ? (
          <View style={styles.viewContainerCalender}>
            <Image source={backIcon} style={styles.iconCalender} />
          </View>
        ) : (
          backIcon && (
            <View style={styles.viewContainer}>
              <Image source={backIcon} style={styles.iconArrow} />
            </View>
          )
        )}
        {showHideControll && (
          <>
            {showEye ? (
              <TouchableWithoutFeedback onPress={() => setShowEye(!showEye)}>
                <View style={styles.eyeIconContainer}>
                  <Image source={ICONS.showEye} style={styles.eyeIcon} />
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={() => setShowEye(!showEye)}>
                <View style={styles.eyeIconContainer}>
                  <Image source={ICONS.hideEye} style={styles.eyeIcon} />
                </View>
              </TouchableWithoutFeedback>
            )}
          </>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default TextInputCustom;

const styles = StyleSheet.create({
  textInput: {
    borderColor: color.TRANSPARENT,
    paddingHorizontal: 23,
    fontFamily: 'Poppins',
    width: 315,
    maxWidth: 320,
    overflow: 'hidden',
  },
  wrapper: {
    marginVertical: 15,
  },
  error: {
    color: color.SECONDARY_COLOR,
    marginTop: 5,
    paddingLeft: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 11,
    position: 'relative',
    // height: 55,
    // maxHeight: 55,
    width: '100%',
    // flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  label: {
    position: 'absolute',
    top: -12,
    left: 20,
    fontSize: 14,
    fontWeight: '400',
    color: color.P_TEXT,
    backgroundColor: color.PRIMARY_COLOR,
  },
  iconArrow: {
    width: 15,
    height: 20,
    resizeMode: 'contain',
  },
  eyeIcon: {
    width: 20,
    height: 25,
    resizeMode: 'contain',
  },
  iconCalender: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  viewContainer: {
    paddingLeft: 8,
    justifyContent: 'center',
  },
  eyeIconContainer: {
    paddingRight: 8,
    justifyContent: 'center',
  },
  viewContainerCalender: {
    paddingLeft: 5,
    justifyContent: 'center',
  },
});
