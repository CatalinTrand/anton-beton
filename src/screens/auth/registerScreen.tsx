import React, {useState} from 'react';
import {Keyboard, Text, View, TouchableWithoutFeedback, ScrollView, Switch} from 'react-native';
import {CheckBox} from 'react-native-elements';
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

const RegisterScreen = ({navigation}): JSX.Element => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);

  const onRegisterPress = () => {
    navigation.navigate('MapScreen');
    return;

    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);
    //dispatch(requestRegister(params));
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
      return false;
    }
    return false;
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
            <View style={[DoctorProfileLtrStyle.row, {justifyContent: 'space-between'}]}>
              <LoginOptions navigation={navigation}/>
            </View>
            <View style={[DoctorProfileLtrStyle.row, {marginVertical: Metrics.doubleBaseMargin}]}>
              <View style={[DoctorProfileLtrStyle.column, {width: '100%'}]}>
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
                  label={I18n.t('phone_number')}
                  value={phone}
                  type="regular"
                  onChange={(value) => setPhone(value)}
                />
                <View
                  style={[CustomCheckboxLtrStyle.wrapper, {marginTop: Metrics.doubleBaseMargin}]}
                >
                  <View>
                    <CheckBox
                      checked={agreeTerms}
                      checkedIcon="check-square"
                      uncheckedIcon="square"
                      checkedColor={Colors.orange}
                      onPress={() => setAgreeTerms(!agreeTerms)}
                      center
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
                    checked={agreePolicy}
                    checkedIcon="check-square"
                    uncheckedIcon="square"
                    checkedColor={Colors.orange}
                    onPress={() => setAgreePolicy(!agreePolicy)}
                    center
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
