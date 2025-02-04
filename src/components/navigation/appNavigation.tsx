import React from 'react';
// @ts-ignore
import { PropTypes } from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { CustomIcons, Fonts, Colors } from '../../../shared/themes';
import LoginScreen from '../../screens/auth/loginScreen';
import RegisterScreen from '../../screens/auth/registerScreen';
import TermsAndConditions from '../../screens/staticScreens/termsAndConditions';
import PrivacyPolicy from '../../screens/staticScreens/privacyPolicy';
import PaymentVisitScreen from '../../screens/auth/paymentVisit';
import AddCreditCardScreen from '../../screens/auth/addCreditCard';
import ForgotPasswordScreen from '../../screens/auth/forgotPassword';
import NewPasswordScreen from '../../screens/auth/newPassword';
import PaymentScreen from "../../screens/paymentScreen";
import MapScreen from "../../screens/mapScreen";
import AppointmentScreen from "../../screens/appointmentScreen";
import RequestListScreen from "../../screens/requestListScreen";
import OrderScreen from "../../screens/orderScreen";
import DeliveryListScreen from "../../screens/deliveryListScreen";
import ViewTruckMapScreen from "../../screens/viewTruckMapScreen";
import MyCardsScreen from "../../screens/myCardsScreen";
import DisplayScreen from "../../screens/displayScreen";
import SupplierOpenOrdersScreen from "../../screens/SupplierOpenOrdersScreen";
import SupplierOngoingOrdersScreen from "../../screens/SupplierOngoingOrdersScreen";
import SupplierViewOpenOrderScreen from "../../screens/supplierViewOpenOrderScreen";

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
      initialRouteName="RequestListScreen"
      activeColor={Colors.black}
      inactiveColor={Colors.grey}
      labeled={false}
      barStyle={{ backgroundColor: Colors.white }}
    >
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomIcons name="circle-plus" color={color} size={Fonts.regular} />
          ),
        }}
      />
      <Tab.Screen
        name="RequestListScreen"
        component={RequestListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomIcons name="list-numbered" color={color} size={Fonts.regular} />
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
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="NewPassword" component={NewPasswordScreen} />
      <AuthStack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <AuthStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
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
      <Stack.Screen name="DisplayScreen" component={DisplayScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="SupplierOpenOrdersScreen" component={SupplierOpenOrdersScreen} />
      <Stack.Screen name="SupplierViewOpenOrderScreen" component={SupplierViewOpenOrderScreen} />
      <Stack.Screen name="SupplierOngoingOrdersScreen" component={SupplierOngoingOrdersScreen} />
      <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Stack.Screen name="RequestListScreen" component={RequestListScreen} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="DeliveryListScreen" component={DeliveryListScreen} />
      <Stack.Screen name="ViewTruckMapScreen" component={ViewTruckMapScreen} />
      <Stack.Screen name="MyCardsScreen" component={MyCardsScreen} />
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
