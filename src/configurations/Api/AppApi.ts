import api from './api';

interface request {
  url?: any;
  headers?: object | any;
  body?: object | any;
  params?: object | any;
  id?: any;
}

const AppApi = {
  signUp: ({body}: request) => api.post('auth/register', body),
  signIn: ({body}: request) => api.post('auth/login', body),
  signOut: () => api.post('user/signOut'),
  getCurrentUser: () => api.get('current_user'),
  onBoardRegister: ({body}: request) => api.post('user/onboarding', body),
  sentPhoneNumberVerification: () => api.post('user/sendPhoneOtp'),
  verfiyOtp: ({body}: request) => api.post('user/verifyPhoneOtp', body),
  forgotPassword: ({body}: request) =>
    api.post('auth/user/forgetPasswordOtp', body),
  forgotPasswordOtp: ({body}: request, token: any) =>
    api.post(`auth/user/verifyPasswordOtp/${token}`, body),
  resetPassword: ({body}: request, token: any) =>
    api.post(`auth/user/resetPassword/${token}`, body),
  signedUrl: ({params}: request) =>
    api.get(`user/getSignedUrl?imageType=profilePhoto`),
  profileImageUpload: ({body}: request) =>
    api.put('user/profileImageUpload', body),
  zodiacDetails: () => api.get('zodiacDetails'),
  country: () => api.get('country'),
  states: ({url}: request) => api.get(url),
  cities: ({url}: any) => api.get(url),
};

export default AppApi;
