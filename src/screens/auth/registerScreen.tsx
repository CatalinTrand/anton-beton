import React, {useState} from 'react';
import {Keyboard, Text, View, TouchableWithoutFeedback, ScrollView, Switch} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-community/picker';
import {doFormat} from 'date-dealer';
import loginPageStyle from '../../../shared/styles/auth.ltr.style';
import Header from '../../components/sections/header';
import I18n from '../../../shared/I18n/I18n';
import {Colors, CustomIcons, Fonts, Metrics} from '../../../shared/themes';
import GlobalLtrStyle from '../../../shared/styles/global.ltr.style';
import DoctorProfileLtrStyle from '../../../shared/styles/doctorProfile.ltr.style';
import LoginOptions from '../../components/sections/loginOptions';
import RegularButton from '../../../shared/components/buttons/regularButton';
import FloatPlaceholderTextInput from '../../../shared/components/sections/floatPlaceholderTextInput';
import CustomCheckboxLtrStyle from '../../../shared/styles/customCheckbox.ltr.style';
import LabeledDatePicker from '../../../shared/components/sections/customLabeledDatePicker';
import {getRequest, postRequest} from "../../requestHandler";
import SyncStorage from 'sync-storage';

const RegisterScreen = ({navigation}): JSX.Element => {

  I18n.locale = 'ro';
  const [lng, setLng] = useState(I18n.locale);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);

  const onRegisterPress = () => {
    const params = {email: "", password: "", deviceID: "", firstName: "", lastName: "", phone: "", companyName: ""};
    let deviceID = SyncStorage.get('deviceID');
    if (deviceID == null)
      getRequest("uuid", null, response => {
        if (response.data.success) {
          deviceID = response.data.uuid;
          SyncStorage.set('deviceID', deviceID);

          params.email = email;
          params.password = password;
          params.deviceID = deviceID;
          if(isEnabled)
            params.companyName = companyName;
          else {
            params.firstName = firstName;
            params.lastName = lastName;
          }
          params.phone = phone;
          postRequest(isEnabled ? "supplier/user/account" : "client/user/account", {email, password}, null, response2 => {
            console.log(response2.data);
            if(response.data.success) {
              SyncStorage.set('token', response.data.token);
              SyncStorage.set("firebaseToken", "nuKaXrFuzjk8xTfoqkUWPxFrHeLA7pEJeqBotbdd");
              navigation.navigate('DisplayScreen', {lng});
            }
          });
        } else {
          console.log(response);
        }
      });
    else {
      console.log("deviceID", deviceID);
      params.email = email;
      params.password = password;
      params.deviceID = deviceID;
      if(isEnabled)
        params.companyName = companyName;
      else {
        params.firstName = firstName;
        params.lastName = lastName;
      }
      params.phone = phone;
      postRequest(isEnabled ? "supplier/user/account" : "client/user/account", {email, password}, null, response => {
        console.log(response);
        if(response.data.success) {
          SyncStorage.set('token', response.data.token);
          navigation.navigate('DisplayScreen', {lng});
        }
      });
    }
  };

  const disabledNextStep = () => {
    if (
      !agreePolicy ||
      !agreeTerms ||
      !email ||
      !password ||
      !lastName ||
      !firstName ||
      !phone
    ) {
      return true;
    }
    return false;
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const disableSwitch = true; //disable the switch that allows the user to login either as a client or supplier

  return (
    <>
      <Header
        leftComponent={
          <CustomIcons
            size={Fonts.medium}
            color={Colors.black}
            name="arrow-back"
            onPress={navigation.goBack}
          />
        }
      />
      <ScrollView style={loginPageStyle.containerView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={GlobalLtrStyle.centeredView}>
            <Text style={[GlobalLtrStyle.bigHeader, {color: Colors.orange}]}>
              {I18n.t('create_account')}
            </Text>
            <View style={[DoctorProfileLtrStyle.row, {marginVertical: Metrics.doubleBaseMargin}]}>
              <View style={[DoctorProfileLtrStyle.column, {width: '100%'}]}>
                {disableSwitch ? null :
                  <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Switch
                      trackColor={{false: "#767577", true: "#81b0ff"}}
                      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                    <Text style={{
                      paddingLeft: 5,
                      color: isEnabled ? Colors.primary : Colors.darkGrey,
                      fontWeight: 'bold',
                      fontSize: Fonts.regular
                    }}>{!isEnabled ? I18n.t('client') : I18n.t('supplier')}</Text>
                  </View>
                }
                <FloatPlaceholderTextInput
                  label={I18n.t('email')}
                  value={email}
                  type="regular"
                  onChange={(value) => setEmail(value)}
                />
                <FloatPlaceholderTextInput
                  label={I18n.t('password')}
                  value={password}
                  type="password"
                  onChange={(value) => setPassword(value)}
                />
                {isEnabled ?
                  < FloatPlaceholderTextInput
                    label={I18n.t('company_name')}
                    value={companyName}
                    type="regular"
                    onChange={(value) => setCompanyName(value)}
                  /> :
                  <>
                    <FloatPlaceholderTextInput
                      extraStyle={{}}
                      label={I18n.t('last_name')}
                      value={lastName}
                      type="regular"
                      onChange={(value) => setLastName(value)}
                    />
                    < FloatPlaceholderTextInput
                      label={I18n.t('first_name')}
                      value={firstName}
                      type="regular"
                      onChange={(value) => setFirstName(value)}
                    />
                  </>
                }
                <FloatPlaceholderTextInput
                  label={I18n.t('phone_number')+""}
                  value={phone}
                  type="regular"
                  onChange={(value) => setPhone(value)}
                />
                <View
                  style={[CustomCheckboxLtrStyle.wrapper, {marginTop: Metrics.doubleBaseMargin}]}
                >
                  <View>
                    <CheckBox
                      value={agreeTerms}
                      onValueChange={() => setAgreeTerms(!agreeTerms)}
                    />
                  </View>
                  <View style={[CustomCheckboxLtrStyle.textWrapper]}>
                    <Text style={{fontSize: Fonts.small, color: Colors.grey}}>
                      {I18n.t('i_agree_with')}
                    </Text>
                    <Text
                      style={[CustomCheckboxLtrStyle.linkText, {color: Colors.darkGrey}]}
                      onPress={() => navigation.navigate('TermsAndConditions')}
                    >
                      {I18n.t('terms_and_conditions')}
                    </Text>
                  </View>
                </View>
                <View style={[CustomCheckboxLtrStyle.wrapper]}>
                  <CheckBox
                    value={agreePolicy}
                    onValueChange={() => setAgreePolicy(!agreePolicy)}
                  />
                  <View style={[CustomCheckboxLtrStyle.textWrapper]}>
                    <Text style={{fontSize: Fonts.small, color: Colors.grey}}>
                      {I18n.t('i_understand')}
                    </Text>
                    <Text
                      style={[CustomCheckboxLtrStyle.linkText, {color: Colors.darkGrey}]}
                      onPress={() => navigation.navigate('PrivacyPolicy')}
                    >
                      {I18n.t('policy')}
                    </Text>
                  </View>
                </View>
                <RegularButton
                  disabledStyle={[{backgroundColor: Colors.orangeOpacity}]}
                  disabledTitleStyle={[{color: Colors.white}]}
                  disabled={disabledNextStep()}
                  title={I18n.t('create_account')}
                  onPress={onRegisterPress}
                  buttonStyle={[
                    GlobalLtrStyle.buttonStyle,
                    {
                      marginTop: 20,
                      backgroundColor: Colors.orange,
                    },
                  ]}
                  containerStyle={{justifyContent: 'center', alignItems: 'center'}}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;
