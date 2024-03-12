import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/AuthHeader';
import {IMAGES} from '../../../assets/Images';
import TextInputCustom from '../../../components/TextInputCustom';
import {ICONS} from '../../../assets/Icons';
import ButtonCustom from '../../../components/Button';
import Text from '../../../components/GlobalText';
import SlideModal from '../../../components/SlideModal';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../auth/Auth';
import colors from '../../../configurations/config/color.config';
import {
  IdVerificationvalueType,
  IdVerificationFormValue,
} from '../../../utilis/types/PrefernceVerification';
import {WIDTH, HEIGHT} from '../../../configurations/config/app.config';
import {IDSelect} from '../../../utilis/feildStaticData/PrefernceVerification';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../../redux/actions';

const IdVerification = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();

  const [form, setForm] = useState<IdVerificationvalueType>({
    ...IdVerificationFormValue,
  });
  const [feildValue, setFeildValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [list, setList] = useState<any>('');

  const RegisterFunc = () => {
    // const isValid = isValidData()
    // if (isValid) {
    //     setForm({ ...form, subCaste: "" })
    // navigation.navigate('RegisterSecond')
    dispatch(authAction.setLogin(true));
    // }
  };
  const toogleFunc = (text: string) => {
    switch (text) {
      case 'Select the ID':
        settingModal('selectedId', IDSelect);
        break;
      default:
        null;
    }
  };
  const selectedPopupData = (value: any) =>
    setForm({...form, selectedId: value?.title, selectedIdError: ''});

  const settingModal = (feilName: string, data: any) => {
    setModalVisible(true);
    setFeildValue(feilName);
    setList([...data]);
  };

  return (
    <View style={styles.container}>
      <Header imgSrc={IMAGES.IDVerfication} navigationText="IdVerification" />
      <ScrollView style={styles.form}>
        <Text style={styles.contentHeading}>ID Verification</Text>
        <Text style={styles.sectionHeading}>
          Find you the perfect match by completing your KYC verification today.
        </Text>

        <TextInputCustom
          placeholder="Select"
          label="Select the ID"
          value={form.selectedId}
          error={form.selectedIdError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="iD number"
          value={form.idNumber}
          error={form.idNumberError}
          activeIcon={toogleFunc}
          label="Enter the id Number"
        />
        <TextInputCustom
          placeholder="Upload the Document"
          label="Upload the ID"
          value={form.uplodedId}
          error={form.uplodedIdError}
          activeIcon={toogleFunc}
          backIcon={ICONS.documentUpload}
        />

        <ButtonCustom title="Submit" onPressFunc={RegisterFunc} MV={10} />

        <View style={styles.buttom} />
      </ScrollView>
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        feildName={feildValue}
        list={list}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedPopupData={selectedPopupData}
        selectedArrayData={toogleFunc}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      />
    </View>
  );
};

export default IdVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.P_TEXT,
    lineHeight: 24,
    marginVertical: 10,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 0.6,
  },
  registerContent: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.P_TEXT,
    paddingHorizontal: 20,
    height: 60,
  },
  buttom: {
    height: 80,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.P_TEXT,
    marginVertical: 20,
  },
  contentHeading: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
  },
});
