import React from 'react';
// @ts-ignore
import { PropTypes } from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MainScreen from '../../screens/mainScreen';
import { CustomIcons, Fonts, Colors } from '../../../shared/themes';
import SearchSpecialists from '../../screens/searchSpecialists';
import SpecializationScreen from '../../screens/specializationScreen';
import DoctorProfile from '../../screens/doctorProfile';
import GetDoctor from '../../screens/getDoctor';
import LoginScreen from '../../screens/auth/loginScreen';
import RegisterScreen from '../../screens/auth/registerScreen';
import TermsAndConditions from '../../screens/staticScreens/termsAndConditions';
import PrivacyPolicy from '../../screens/staticScreens/privacyPolicy';
import CheckPhoneNumberScreen from '../../screens/auth/checkPhoneNumber';
import PaymentVisitScreen from '../../screens/auth/paymentVisit';
import SearchDoctorScreen from '../../screens/searchForDoctor';
import AddCreditCardScreen from '../../screens/auth/addCreditCard';
import ForgotPasswordScreen from '../../screens/auth/forgotPassword';
import NewPasswordScreen from '../../screens/auth/newPassword';
import NoInternetConnection from '../../screens/noInternetConnection';
import FeedbackScreen from '../../screens/feedbackScreen';
import ScheduleCalendar from '../../screens/scheduleCalendar';
import ProfilePicker from '../../screens/profilePicker';
import DocumentSelector from "../../screens/documentSelector";
import PaymentScreen from "../../screens/paymentScreen";
import MapScreen from "../../screens/mapScreen";

const HomeStackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const AppBottomTabNavigator = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="HomeStackNavigator"
      activeColor={Colors.black}
      inactiveColor={Colors.grey}
      labeled={false}
      barStyle={{ backgroundColor: Colors.white }}
    >
      <Tab.Screen
        name="Profile"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomIcons name="circle-plus" color={color} size={Fonts.regular} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomIcons name="heart" color={color} size={Fonts.regular} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <CustomIcons name="home" color={color} size={Fonts.regular} />,
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomIcons name="wallet" color={color} size={Fonts.regular} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomIcons name="hamburger-menu" color={color} size={Fonts.regular} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthNavigation = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      headerMode="none"
      mode="modal"
      screenOptions={{
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5],
              outputRange: [0, 0.25],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="AddCreditCard" component={AddCreditCardScreen} />
      <AuthStack.Screen name="PaymentVisit" component={PaymentVisitScreen} />
      <AuthStack.Screen name="SearchDoctor" component={SearchDoctorScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="NewPassword" component={NewPasswordScreen} />
      <AuthStack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <AuthStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <AuthStack.Screen name="NoInternetConnection" component={NoInternetConnection} />
      <AuthStack.Screen name="FeedbackScreen" component={FeedbackScreen} />
    </AuthStack.Navigator>
  );
};

const MainAppNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5],
              outputRange: [0, 0.25],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}
    >
      <Stack.Screen name="HomeStackNavigator" component={HomeStackNavigator} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
      <Stack.Screen name="ScheduleCalendar" component={ScheduleCalendar} />
      <Stack.Screen name="ProfilePicker" component={ProfilePicker} />
      <Stack.Screen name="DocumentSelector" component={DocumentSelector} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="GetDoctor" component={GetDoctor} />
      <Stack.Screen name="Auth" component={AuthNavigation} />
    </Stack.Navigator>
  );
};

AppBottomTabNavigator.defaultProps = {
  color: '',
};
AppBottomTabNavigator.propTypes = {
  // eslint-disable-next-line react-redux/no-unused-prop-types,react/no-unused-prop-types
  color: PropTypes.string,
};
export default MainAppNavigation;
