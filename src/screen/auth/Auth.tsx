import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import LoginScreen from "./Login"
import SignUpScreen from "./SignUp"
import SplashScreen from "./SplashScreen"
import WelcomeScreen from "./Welcome"
import ForgotPasswordScreen from './ForgotPassword'
import CreatePasswordScreen from './CreatePassword'
import ForgotPasswordOtpVerifyScreen from './ForgotPasswordOtpVerify'
import RegistrationFirstScreen from './RegistrationFirst'
import RegisterSecondScreen from './RegistrationSecond'
import RegisterOtpVerifyScreen from './RegisterOtpVerify'
import AddingProfilePictureScreen from './AddingProfilePicture'

import PersonalDetailsScreen from '../app/prefernceAndVerfication/PersonalDetails'
import PartnerPreferanceScreen from '../app/prefernceAndVerfication/PartnerPreferance'
import IdVerificationScreen from '../app/prefernceAndVerfication/IdVerification'

export type AuthStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Splash: undefined;
    Welcome: undefined;
    ForgotPassword: undefined;
    CreatePassword: { resetToken?: string };
    ForgotPasswordOtpVerify: { resetToken?: string };
    RegisterFirst: undefined;
    RegisterSecond: undefined;
    RegisterOtpVerify: undefined;
    AddingProfilePicture: undefined;
    PersonalDetails: undefined;
    PartnerPreferance: undefined;
    IdVerification: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function Auth() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />

            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ForgotPasswordOtpVerify"
                options={{ gestureEnabled: false}}
                initialParams={{ resetToken: "" }}
                component={ForgotPasswordOtpVerifyScreen}
            />
            <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />

            <Stack.Screen name="RegisterFirst" component={RegistrationFirstScreen} />
            <Stack.Screen name="RegisterSecond" component={RegisterSecondScreen} />
            <Stack.Screen name="RegisterOtpVerify" component={RegisterOtpVerifyScreen} />
            <Stack.Screen name="AddingProfilePicture" component={AddingProfilePictureScreen} />
            <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
            <Stack.Screen name="PartnerPreferance" component={PartnerPreferanceScreen} />
            <Stack.Screen name="IdVerification" component={IdVerificationScreen} />
        </Stack.Navigator>
    )
}