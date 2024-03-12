import { USER_LOGGED ,FORGOT_PASSWORD_MOBILENUMBER,COUNTRY_DETAILS,CURRENT_USER} from '../types';


const setLogin = (payload: any) => ({
  type: USER_LOGGED,
  payload,
});

const setForgotPasswordNumber = (payload: any) => ({
  type: FORGOT_PASSWORD_MOBILENUMBER,
  payload,
});

const setCountry = (payload: any) => ({
  type: COUNTRY_DETAILS,
  payload,
});

const setCurrentUser = (payload: any) => ({
  type: CURRENT_USER,
  payload,
});

export default {
  setLogin,
  setForgotPasswordNumber,
  setCountry,
  setCurrentUser
};