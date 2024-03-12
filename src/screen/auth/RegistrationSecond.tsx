import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/RegistrationHeader';
import TextInputCustom from '../../components/TextInputCustom';
import {IMAGES} from '../../assets/Images';
import {ICONS} from '../../assets/Icons';
import ButtonCustom from '../../components/Button';
import Text from '../../components/GlobalText';
import SlideModal from '../../components/SlideModal';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from './Auth';
import colors from '../../configurations/config/color.config';
import AppApi from '../../configurations/Api/AppApi';
import {isValidOnboardPageTwo} from '../../utilis/formValidation/formValidation';
import {WIDTH, HEIGHT} from '../../configurations/config/app.config';
import {
  registerSecondValueType,
  registerSecondFormValue,
} from '../../utilis/types/Registration';
import {
  height,
  physicalStatus,
  education,
  employedIn,
  occupation,
  familyStatus,
  familyType,
  familyValues,
} from '../../utilis/feildStaticData/Registeration';
import {ToastAndNotification} from '../../components/ToastAndNotification';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../redux/actions';

const RegistrationSecond = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);
  const dispatch = useDispatch();

  const [form, setForm] = useState<registerSecondValueType>({
    ...registerSecondFormValue,
  });
  const [feildValue, setFeildValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [list, setList] = useState<any>('');

  const RegisterFunc = () => {
    const [isValid, newForm] = isValidOnboardPageTwo({...form});
    if (isValid) {
      setForm({...registerSecondFormValue});
      const body = {
        profileStatus: 2,
        generalDetails: {
          height: form.height,
          physicalStatus: form.physicalStatus,
          education: form.education,
          employedIn: form.employedIn,
          occupation: form.occupation,
          currency: form.currency,
          income: form.income,
          familyStatus: form.familyStatus,
          familyValue: form.familyValue,
          familyType: form.familyType,
          ancestralOrigin: form.ancestralOrigin,
          description: form.aboutMyself,
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
                  navigation.navigate('RegisterOtpVerify');
                }
              })
              .catch(error => {
                console.log('getCurrentUser', error);
              });
          } else ToastAndNotification('error', 'Register');
        })
        .catch(error => {
          ToastAndNotification(error?.data?.error, 'Register');
          console.log('onBoardRegister', error);
        });
    } else {
      setForm(newForm);
    }
  };

  const selectedPopupData = (value: any) => {
    switch (feildValue) {
      case 'height':
        setForm({...form, height: value?.title, heightError: ''});
        break;
      case 'physicalStatus':
        setForm({
          ...form,
          physicalStatus: value?.title,
          physicalStatusError: '',
        });
        break;
      case 'education':
        setForm({...form, education: value?.title, educationError: ''});
        break;
      case 'employedIn':
        setForm({...form, employedIn: value?.title, employedInError: ''});
        break;
      case 'occupation':
        setForm({...form, occupation: value?.title, occupationError: ''});
        break;
      case 'familyStatus':
        setForm({...form, familyStatus: value?.title, familyStatusError: ''});
        break;
      case 'familyType':
        setForm({...form, familyType: value?.title, familyTypeError: ''});
        break;
      case 'familyValue':
        setForm({...form, familyValue: value?.title, familyValueError: ''});
        break;
      default:
        null;
    }
    setModalVisible(false);
  };

  const toogleFunc = (text: string) => {
    switch (text) {
      case 'Height':
        settingModal('height', height);
        break;
      case 'Physical status':
        settingModal('physicalStatus', physicalStatus);
        break;
      case 'Education':
        settingModal('education', education);
        break;
      case 'Employed In':
        settingModal('employedIn', employedIn);
        break;
      case 'Occupation':
        settingModal('occupation', occupation);
        break;
      case 'Family Status':
        settingModal('familyStatus', familyStatus);
        break;
      case 'Family Type':
        settingModal('familyType', familyType);
        break;
      case 'Family Value':
        settingModal('familyValue', familyValues);
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
        content="Get one step closer to your happily ever after by registering with us."
        imgSrc={ICONS.verified}
        showContent={true}
      />
      <ScrollView style={styles.form}>
        <TextInputCustom
          placeholder="Select"
          label="Height"
          value={form.height}
          error={form.heightError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select"
          value={form.physicalStatus}
          error={form.physicalStatusError}
          activeIcon={toogleFunc}
          label="Physical status"
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select"
          value={form.education}
          error={form.educationError}
          activeIcon={toogleFunc}
          label="Education"
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select "
          value={form.employedIn}
          error={form.employedInError}
          activeIcon={toogleFunc}
          label="Employed In"
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select"
          label="Occupation"
          value={form.occupation}
          error={form.occupationError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <Text style={styles.heading}>Annual Income</Text>
        <View style={styles.row}>
          <View style={{width: '30%'}}>
            <TextInputCustom
              value={form.currency}
              editable={false}
              activeIcon={toogleFunc}
              placeholder="INR"
              label="Currency"
            />
          </View>
          <View style={{width: '67%'}}>
            <TextInputCustom
              placeholder="Annual Income"
              value={form.income}
              error={form.incomeError}
              activeIcon={toogleFunc}
              label="Income"
              keyboardType="number-pad"
              onChangeText={income =>
                setForm({...form, income, incomeError: ''})
              }
            />
          </View>
        </View>
        <TextInputCustom
          placeholder="Select "
          value={form.familyStatus}
          error={form.familyStatusError}
          activeIcon={toogleFunc}
          label="Family Status"
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select"
          label="Family Type"
          value={form.familyType}
          error={form.familyTypeError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select"
          label="Family Value"
          value={form.familyValue}
          error={form.familyValueError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Enter Ancestral Origin"
          label="Ancestral Origin"
          value={form.ancestralOrigin}
          error={form.ancestralOriginError}
          activeIcon={toogleFunc}
          onChangeText={ancestralOrigin =>
            setForm({...form, ancestralOrigin, ancestralOriginError: ''})
          }
        />
        <TextInputCustom
          label="About Myself"
          value={form.aboutMyself}
          error={form.aboutMyselfError}
          activeIcon={toogleFunc}
          onChangeText={aboutMyself =>
            setForm({...form, aboutMyself, aboutMyselfError: ''})
          }
          multpileline={true}
          multiline
          numberOfLines={4}
        />
        <ButtonCustom
          title="complete Registartion "
          onPressFunc={RegisterFunc}
          MV={10}
        />

        <View style={styles.buttom} />
      </ScrollView>
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        feildName={feildValue}
        selectedArrayData={toogleFunc}
        list={list}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedPopupData={selectedPopupData}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      />
    </View>
  );
};

export default RegistrationSecond;

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
});
