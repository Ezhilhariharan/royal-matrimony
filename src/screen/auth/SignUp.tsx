import {
  StyleSheet,
  Button,
  View,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from './Auth';
import {useDispatch} from 'react-redux';
import {authAction} from '../../redux/actions';
import TextInputCustom from '../../components/TextInputCustom';
import Header from '../../components/AuthHeader';
import {IMAGES} from '../../assets/Images';
import {ICONS} from '../../assets/Icons';
import ButtonCustom from '../../components/Button';
import Text from '../../components/GlobalText';
import SlideModal from '../../components/SlideModal';
import DatePicker from 'react-native-date-picker';
import AppApi from '../../configurations/Api/AppApi';
import {isValidRegister} from '../../utilis/formValidation/formValidation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../configurations/config/color.config';
import {valueType, formValue} from '../../utilis/types/SignUp';
import {WIDTH, HEIGHT} from '../../configurations/config/app.config';
import {Profile, Gender} from '../../utilis/feildStaticData/SignUpStatic';
import {loginApi} from '../../utilis/helper/Login';
import {ToastAndNotification} from '../../components/ToastAndNotification';

const SignUp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [form, setForm] = useState<valueType>({...formValue});
  const [feildName, setFeildName] = useState<string>('');
  const [list, setList] = useState<any>('');
  const [date, setDate] = useState<any>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.setItem('token', '');
  }, []);

  const RegisterFunc = () => {
    const [isValid, newForm] = isValidRegister({...form});
    setForm(newForm);

    if (isValid) {
      const body = {
        email: form.mail,
        password: form.password,
        passwordConfirmation: form.passwordConfirmation,
        firstName: form.firstName,
        lastName: form.lastName,
        profileType: form.profile,
        dateOfBirth: form.dateOfBirth,
        age: form.Age,
        phoneNumber: form.mobileNumber,
        gender: form.gender,
      };

      AppApi.signUp({body})
        .then(res => {
          if (res?.data?.statusCode === 200) {
            setForm({...formValue});
            loginApi(body, navigate, currentUser, setLogin);
          }
        })
        .catch(error => {
          ToastAndNotification(error?.data?.error, 'Register');
        });
    }
  };

  const setLogin = () => dispatch(authAction.setLogin(true));

  const currentUser = (userDetails: any) =>
    dispatch(authAction.setCurrentUser(userDetails));

  const navigate = () => navigation.navigate('RegisterFirst');

  const calculate_age = (dob: any) => {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    setForm({
      ...form,
      Age: JSON.stringify(Math.abs(age_dt.getUTCFullYear() - 1970)),
      AgeError: '',
      dateOfBirth: dob.toLocaleString()?.split(',')[0],
      dateOfBirthError: '',
    });
  };

  const selectedPopupData = (value: any) => {
    switch (feildName) {
      case 'Profile':
        validateProfile(value?.title);
        break;
      case 'Gender':
        setForm({...form, gender: value?.title, genderError: ''});
        break;
      default:
        null;
    }
    setModalVisible(false);
  };

  const validateProfile = (selectedData: string) => {
    if (selectedData === 'Son' || selectedData === 'Brother')
      setForm({
        ...form,
        gender: 'Male',
        genderError: '',
        profile: selectedData,
        profileError: '',
      });
    else if (selectedData === 'Sister' || selectedData === 'Daughter')
      setForm({
        ...form,
        gender: 'Female',
        genderError: '',
        profile: selectedData,
        profileError: '',
      });
    else setForm({...form, profile: selectedData, profileError: ''});
  };

  const toogleFunc = (text: string) => {
    switch (text) {
      case 'Date OF Birth':
        setOpen(true);
        break;
      case 'Select the profile for':
        setModalVisible(true);
        setFeildName('Profile');
        setList([...Profile]);
        break;
      case 'Gender':
        setModalVisible(true);
        setFeildName('Gender');
        setList([...Gender]);
        break;
      default:
        null;
    }
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 70);

  return (
    <View style={styles.container}>
      <Header imgSrc={IMAGES.registerHeader} navigationText="Login" />
      <Text style={styles.registerContent}>
        Hurray! Finding the perfect life partner starts here.
      </Text>
      <ScrollView style={styles.form}>
        <TextInputCustom
          placeholder="Myself"
          label="Select the profile for"
          value={form.profile}
          error={form.profileError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="type your first name"
          value={form.firstName}
          error={form.firstNameError}
          activeIcon={toogleFunc}
          onChangeText={firstName =>
            setForm({...form, firstName, firstNameError: ''})
          }
          label="First Name"
        />
        <TextInputCustom
          placeholder="type your Last name"
          value={form.lastName}
          error={form.lastNameError}
          activeIcon={toogleFunc}
          onChangeText={lastName =>
            setForm({...form, lastName, lastNameError: ''})
          }
          label="Last Name"
        />
        <TextInputCustom
          placeholder="Male"
          value={form.gender}
          error={form.genderError}
          activeIcon={toogleFunc}
          label="Gender"
          backIcon={ICONS.rightArrowInput}
        />
        <View style={styles.row}>
          <View style={{width: '72%'}}>
            <TextInputCustom
              placeholder="dd/mm/yyyy"
              label="Date OF Birth"
              value={form.dateOfBirth}
              error={form.dateOfBirthError}
              activeIcon={toogleFunc}
              // editable={false}
              // keyboardType="none"
              width={220}
              spellCheck={false}
              autoCorrect={false}
              backIcon={ICONS.calender}
            />

            <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              minimumDate={minDate}
              maximumDate={maxDate}
              androidVariant="iosClone"
              onConfirm={date => {
                setOpen(false);
                calculate_age(date);
              }}
              onCancel={() => setOpen(false)}
            />
          </View>
          <View style={{width: '25%'}}>
            <TextInputCustom
              value={form.Age}
              error={form.AgeError}
              editable={false}
              activeIcon={toogleFunc}
              label="Age"
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={{width: '25%'}}>
            <TextInputCustom
              value={form.mobileCode}
              error={form.mobileCodeError}
              editable={false}
              activeIcon={toogleFunc}
              label="Code"
            />
          </View>
          <View style={{width: '72%'}}>
            <TextInputCustom
              placeholder="Enter Your Number"
              value={form.mobileNumber}
              error={form.mobileNumberError}
              keyboardType="number-pad"
              activeIcon={toogleFunc}
              onChangeText={mobileNumber =>
                setForm({...form, mobileNumber, mobileNumberError: ''})
              }
              label="Number"
            />
          </View>
        </View>
        <TextInputCustom
          placeholder="Mail Id"
          value={form.mail}
          keyboardType="email-address"
          error={form.mailError}
          activeIcon={toogleFunc}
          onChangeText={mail => setForm({...form, mail, mailError: ''})}
          label="Enter Your Email"
        />
        <TextInputCustom
          placeholder="Enter Your Password"
          value={form.password}
          error={form.passwordError}
          activeIcon={toogleFunc}
          showHideControll={true}
          onChangeText={password =>
            setForm({...form, password, passwordError: ''})
          }
          label="Password"
        />
        <TextInputCustom
          placeholder="Enter Your Password"
          value={form.passwordConfirmation}
          error={form.passwordConfirmationError}
          activeIcon={toogleFunc}
          showHideControll={true}
          onChangeText={passwordConfirmation =>
            setForm({
              ...form,
              passwordConfirmation,
              passwordConfirmationError: '',
            })
          }
          label="Confirm Password"
        />

        <ButtonCustom
          title="Register Free"
          onPressFunc={RegisterFunc}
          MV={10}
        />

        <Text style={[styles.bold, {paddingTop: 10}]}>
          By clicking this Button,you accepted our
        </Text>
        <View style={styles.rowHorizontal}>
          <Text style={styles.primaryColor}>Terms and Condition</Text>
          <Text style={styles.bold}> &</Text>
          <Text style={styles.primaryColor}>Privacy Policy </Text>
        </View>

        <View style={styles.buttom} />
      </ScrollView>
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
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

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    flex: 1,
  },
  registerContent: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.P_TEXT,
    paddingHorizontal: 20,
    height: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  buttom: {
    height: 80,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowHorizontal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 3,
  },
  bold: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.P_TEXT,
    textAlign: 'center',
  },
  primaryColor: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.SECONDARY_COLOR,
    marginHorizontal: 4,
    textAlign: 'center',
  },
});
