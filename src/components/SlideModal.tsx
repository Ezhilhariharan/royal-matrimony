import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import Text from '../components/GlobalText';
import color from '../configurations/config/color.config';
import TextInput from '../components/TextInputCustom';
import CheckBox from '@react-native-community/checkbox';

interface Props {
  hideModal: () => void;
  selectedPopupData: (value: any) => void;
  selectedArrayData: (value: any) => void;
  hideCloseButton?: boolean;
  style?: StyleProp<ViewStyle>;
  feildName?: string;
  list?: any;
  search?: boolean;
  checkbox?: boolean;
}

const SlideModal = ({
  hideModal,
  hideCloseButton,
  style,
  children,
  feildName,
  list,
  search,
  checkbox,
  selectedPopupData,
  selectedArrayData,
  ...props
}: Props & Partial<ModalProps>) => {
  const [searchValue, setsearchValue] = useState<string>('');
  const [toggleCheckBox, setToggleCheckBox] = useState<any>('');

  const renderItem = ({item}: any) => {
    return (
      //   <Pressable
      //     onPress={() => selectedPopupData(item)}
      //     style={({pressed}: any) => [
      //       {backgroundColor: pressed ? '#FAFAFA' : 'white'},
      //       styles.press,
      //     ]}>
      <>
        {checkbox ? (
          <View style={styles.row}>
            <CheckBox
              disabled={false}
              value={item?.isActive}
              onValueChange={newValue => selectedArrayData(item)}
            />
            <Text style={styles.checkboxList}>
              {item?.name ? item?.name : item?.title}
            </Text>
          </View>
        ) : (
          <Pressable
            onPress={() => selectedPopupData(item)}
            style={({pressed}: any) => [
              {backgroundColor: pressed ? '#FAFAFA' : 'white'},
              styles.press,
            ]}>
            <Text style={styles.list}>
              {item?.name ? item?.name : item?.title}
            </Text>
          </Pressable>
        )}
      </>
      //   {/* </Pressable> */}
    );
  };

  const toogleFunc = () => {};

  return (
    <Modal {...props} style={styles.container}>
      {search && (
        <TextInput
          placeholder=""
          value={searchValue}
          activeIcon={toogleFunc}
          onChangeText={value => setsearchValue(prevState => prevState + value)}
          label="Search"
        />
      )}

      <FlatList
        data={list && list}
        renderItem={renderItem}
        keyExtractor={item =>
          item?.id ? item?.id : item?.uuid ? item?.uuid : item?._id
        }
      />
    </Modal>
  );
};

export default SlideModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.PRIMARY_COLOR,
    margin: 0,
    marginLeft: 130,
    padding: 15,
  },
  list: {
    fontSize: 15,
    fontWeight: '400',
    paddingVertical: 20,
    paddingHorizontal: 10,
    color: color.P_TEXT,
  },
  press: {
    borderRadius: 8,
  },
  row: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxList: {
    fontSize: 15,
    fontWeight: '400',
    color: color.P_TEXT,
  },
});
