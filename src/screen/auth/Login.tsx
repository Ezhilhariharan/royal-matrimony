import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from './Auth';
import TextInputCustom from '../../components/TextInputCustom';
import Button from '../../components/Button';
import Header from '../../components/AuthHeader';
import DividerContent from '../../components/DividerContent';
import {IMAGES} from '../../assets/Images';
import Text from '../../components/GlobalText';
import {isValidLogin} from '../../utilis/formValidation/formValidation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../configurations/config/color.config';
import {loginApi} from '../../utilis/helper/Login';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../redux/actions';

interface valueType {
  mail: any;
  password: any;
  mailError: string;
  passwordError: string;
}

const formValue = {
  mail: '',
  password: '',
  mailError: '',
  passwordError: '',
};

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();

  //state
  const [form, setForm] = useState<valueType>({...formValue});

  useEffect(() => {
    setForm({...form, mail: 'ezhil@aptonworks.com', password: 'Ezhil@1234'});
    AsyncStorage.setItem('token', '');
  }, []);

  const login = async () => {
    const [isValid, newForm] = isValidLogin({...form});

    if (isValid) {
      setForm({...form, mail: '', password: ''});

      const body = {
        email: form.mail,
        password: form.password,
      };
      await loginApi(body, navigate, currentUser, setLogin);
    } else {
      setForm(newForm);
    }
  };

  const setLogin = () => {
    dispatch(authAction.setLogin(true));
  };

  const currentUser = (userDetails: any) => {
    dispatch(authAction.setCurrentUser(userDetails));
  };

  const navigate = () => {
    // navigation.navigate('RegisterFirst');
    // navigation.navigate('IdVerification');
  };

  const toogleFunc = (text: string) => {};

  return (
    <View style={styles.container}>
      <Header imgSrc={IMAGES.loginHeader} navigationText="Register" />
      <ScrollView style={styles.form}>
        <TextInputCustom
          placeholder="Email"
          label="Email/mobile/profile iD"
          value={form.mail}
          error={form.mailError}
          keyboardType="email-address"
          activeIcon={toogleFunc}
          onChangeText={mail => setForm({...form, mail, mailError: ''})}
        />
        <TextInputCustom
          placeholder="Password"
          label="Password"
          value={form.password}
          keyboardType="default"
          activeIcon={toogleFunc}
          showHideControll={true}
          onChangeText={password =>
            setForm({...form, password, passwordError: ''})
          }
          error={form.passwordError}
        />
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.buttonText}>Forget Password ?</Text>
          </TouchableOpacity>
        </View>

        <Button title="Login" MV={10} onPressFunc={login} />
        {/* <DividerContent /> */}
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  form: {
    height: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    flexWrap: 'wrap-reverse',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
  },
});
