import {StyleSheet, View, ScrollView, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/RegistrationHeader';
import TextInputCustom from '../../components/TextInputCustom';
import {ICONS} from '../../assets/Icons';
import ButtonCustom from '../../components/Button';
import Text from '../../components/GlobalText';
import SlideModal from '../../components/SlideModal';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from './Auth';
import colors from '../../configurations/config/color.config';
import AppApi from '../../configurations/Api/AppApi';
import {isValidOnboardPageOne} from '../../utilis/formValidation/formValidation';
import {valueType, formValue} from '../../utilis/types/Registration';
import {WIDTH, HEIGHT} from '../../configurations/config/app.config';
import {
  language,
  maritalStatus,
  religion,
  caste,
  subCaste,
  dosham,
  doshamYes,
  interCommunity,
  yesAndNo,
  numbers,
} from '../../utilis/feildStaticData/Registeration';
import {ToastAndNotification} from '../../components/ToastAndNotification';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../redux/actions';

const RegistrationFirst = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const dispatch = useDispatch();
  const countryList = useSelector((state: any) => state?.auth?.country);
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);

  const [form, setForm] = useState<valueType>({...formValue});
  const [feildValue, setFeildValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [list, setList] = useState<any>('');
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    getCountry();
  }, []);

  const RegisterFunc = () => {
    const [isValid, newForm] = isValidOnboardPageOne({...form});
    setForm(newForm);
    if (isValid) {
      setForm({...formValue});
      const body = {
        profileStatus: 1,
        religionDetails: {
          motherTongue: form.motherTongue,
          maritalStatus: form.maritalStatus,
          religion: form.religion,
          caste: form.caste,
          subCaste: form.subCaste,
          dosham: form.doshamYes,
          children: form.Children,
          noOfChildrens: form.numberOfChildren,
          willingToInterCommunity: form.interCommunity,
        },
        locationDetails: {
          country: form.country,
          city: form.city,
          state: form.state,
        },
      };

      AppApi.onBoardRegister({body})
        .then(res => {
          if (res?.status === 200) {
            AppApi.getCurrentUser()
              .then(res => {
                if (res?.status === 200) {
                  dispatch(
                    authAction.setCurrentUser(res?.data?.response?.data),
                  );
                  navigation.navigate('RegisterSecond');
                }
              })
              .catch(error => {
                console.log('getCurrentUser', error);
              });
          } else ToastAndNotification('error', 'Register');
        })
        .catch(error => {
          ToastAndNotification(error?.data?.error, 'Register');
        });
    }
  };

  const getCountry = () => {
    AppApi.country()
      .then(res => {
        if (res?.data?.response?.country && res?.data?.statusCode === 200) {
          dispatch(authAction.setCountry([{...res?.data?.response?.country}]));
          getState(res?.data?.response?.country?.uuid);
        }
      })
      .catch(error => {
        ToastAndNotification(error?.data?.error, 'country');
      });
  };

  const getState = (country_uuid: any) => {
    if (country_uuid) {
      const url = `country/${country_uuid}/states?limit=40&page=1`;
      AppApi.states({url})
        .then(res => {
          if (res?.status === 200) setStates(res?.data?.response?.data);
        })
        .catch(error => {
          ToastAndNotification(error?.data?.error, 'states');
        });
    }
  };

  const getCities = (state_uuid: any) => {
    if (state_uuid) {
      const url = `states/${state_uuid}/cities?page=1&limit=200`;
      AppApi.cities({url})
        .then(res => {
          if (res?.status === 200) setCities(res?.data?.response?.data);
        })
        .catch(error => ToastAndNotification(error?.data?.error, 'states'));
    }
  };

  const selectedPopupData = (value: any) => {
    switch (feildValue) {
      case 'motherTongue':
        setForm({...form, motherTongue: value?.title, motherTongueError: ''});
        break;
      case 'maritalStatus':
        setForm({...form, maritalStatus: value?.title, maritalStatusError: ''});
        break;
      case 'caste':
        setForm({...form, caste: value?.title, casteError: ''});
        break;
      case 'religion':
        setForm({...form, religion: value?.title, religionError: ''});
        break;
      case 'subCaste':
        setForm({...form, subCaste: value?.title, subCasteError: ''});
        break;
      case 'dosham':
        setForm({...form, dosham: value?.title, doshamError: ''});
        break;
      case 'doshamYes':
        setForm({...form, doshamYes: value?.title, doshamYesError: ''});
        break;
      case 'interCommunity':
        setForm({
          ...form,
          interCommunity: value?.title,
          interCommunityError: '',
        });
        break;
      case 'country':
        setForm({...form, country: value?.name, countryError: ''}),
          getState(value?.uuid);
        break;
      case 'Children':
        childrenValidate(value);
        break;
      case 'numberOfChildren':
        setForm({
          ...form,
          numberOfChildren: value?.title,
          numberOfChildrenError: '',
        });
        break;
      case 'state':
        setForm({...form, state: value?.name, stateError: ''}),
          getCities(value?.uuid);
        break;
      case 'city':
        setForm({...form, city: value?.name, cityError: ''});
        break;
      default:
        null;
    }
    setModalVisible(false);
  };

  const childrenValidate = (value: any) => {
    if (value?.title === 'No') {
      setForm({
        ...form,
        numberOfChildren: JSON.stringify(0),
        Children: value?.title,
        ChildrenError: '',
        numberOfChildrenError: '',
      });
    } else {
      setForm({
        ...form,
        Children: value?.title,
        ChildrenError: '',
      });
    }
  };

  const toogleFunc = (text: string) => {
    switch (text) {
      case 'Mother Tongue':
        settingModal('motherTongue', language);
        break;
      case 'Marital status':
        settingModal('maritalStatus', maritalStatus);
        break;
      case 'Religion':
        settingModal('religion', religion);
        break;
      case 'Caste':
        settingModal('caste', caste);
        break;
      case 'Sub Caste':
        settingModal('subCaste', subCaste);
        break;
      case 'Dosham':
        settingModal('dosham', dosham);
        break;
      case 'Dosham Type':
        settingModal('doshamYes', doshamYes);
        break;
      case 'Willing to inter community':
        settingModal('interCommunity', interCommunity);
        break;
      case 'Country':
        settingModal('country', countryList);
        break;
      case 'Children':
        settingModal('Children', yesAndNo);
        break;
      case 'No of Children':
        settingModal('numberOfChildren', numbers);
        break;
      case 'State':
        settingModal('state', states);
        break;
      case 'City':
        settingModal('city', cities);
        break;
      default:
        null;
    }
  };

  const settingModal = (feilName: string, data: any) => {
    setModalVisible(true);
    setFeildValue(feilName);
    setList([...data]);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Registration"
        content="Complete your registration and let us help you find your life partner."
        imgSrc={ICONS.verified}
        showContent={true}
      />
      <ScrollView style={styles.form}>
        <Text style={styles.heading}>Religion Information</Text>
        <TextInputCustom
          placeholder="Tamil"
          label="Mother Tongue"
          value={form.motherTongue}
          error={form.motherTongueError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Never Married"
          value={form.maritalStatus}
          error={form.maritalStatusError}
          activeIcon={toogleFunc}
          label="Marital status"
          backIcon={ICONS.rightArrowInput}
        />
        {form.maritalStatus !== 'Never Married' &&
          form.maritalStatus !== '' && (
            <View style={styles.row}>
              <View style={{width: '40%'}}>
                <TextInputCustom
                  placeholder="yes/no"
                  value={form.Children}
                  error={form.ChildrenError}
                  activeIcon={toogleFunc}
                  label="Children"
                />
              </View>
              <View style={{width: '55%'}}>
                <TextInputCustom
                  value={form.numberOfChildren}
                  keyboardType="number-pad"
                  error={form.numberOfChildrenError}
                  activeIcon={toogleFunc}
                  label="No of Children"
                />
              </View>
            </View>
          )}
        <TextInputCustom
          placeholder="Hindu"
          value={form.religion}
          error={form.religionError}
          activeIcon={toogleFunc}
          label="Religion"
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select "
          value={form.caste}
          error={form.casteError}
          activeIcon={toogleFunc}
          label="Caste"
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select"
          label="Sub Caste"
          value={form.subCaste}
          error={form.subCasteError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select "
          value={form.dosham}
          error={form.doshamError}
          activeIcon={toogleFunc}
          label="Dosham"
          backIcon={ICONS.rightArrowInput}
        />
        {form.dosham === 'Yes' && (
          <TextInputCustom
            placeholder="Select"
            label="Dosham Type"
            value={form.doshamYes}
            error={form.doshamYesError}
            activeIcon={toogleFunc}
            backIcon={ICONS.rightArrowInput}
          />
        )}
        <TextInputCustom
          placeholder="Select"
          label="Willing to inter community"
          value={form.interCommunity}
          error={form.interCommunityError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <Text style={styles.heading}>
          {currentUser?.gender === 'Male' ? 'Groom' : 'Bride'} Current Location
        </Text>
        <TextInputCustom
          placeholder="Select"
          label="Country"
          value={form.country}
          error={form.countryError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <View style={styles.row}>
          <View style={{width: '45%'}}>
            <TextInputCustom
              placeholder="Enter Your State"
              value={form.state}
              error={form.stateError}
              activeIcon={toogleFunc}
              label="State"
            />
          </View>
          <View style={{width: '45%'}}>
            <TextInputCustom
              value={form.city}
              error={form.cityError}
              activeIcon={toogleFunc}
              placeholder="Enter Your City"
              label="City"
            />
          </View>
        </View>

        <ButtonCustom title="Continue" onPressFunc={RegisterFunc} MV={10} />

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
        selectedArrayData={toogleFunc}
        selectedPopupData={selectedPopupData}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      />
    </View>
  );
};

export default RegistrationFirst;

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
});
