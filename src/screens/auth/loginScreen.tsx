import React, {useState} from 'react';
import {Keyboard, Text, View, ScrollView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import loginPageStyle from '../../../shared/styles/auth.ltr.style';
import Header from '../../components/sections/header';
import I18n from '../../../shared/I18n/I18n';
import {Colors, CustomIcons, Fonts, Metrics} from '../../../shared/themes';
import {requestLogin} from '../../redux/actions/authActions';
import GlobalLtrStyle from '../../../shared/styles/global.ltr.style';
import DoctorProfileLtrStyle from '../../../shared/styles/doctorProfile.ltr.style';
import LoginOptions from '../../components/sections/loginOptions';
import RegularButton from '../../../shared/components/buttons/regularButton';
import FloatPlaceholderTextInput from '../../../shared/components/sections/floatPlaceholderTextInput';

const LoginScreen = ({navigation}): JSX.Element => {

  const [lng, setLng] = useState(I18n.locale);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onLoginPress = () => {
    navigation.navigate('DisplayScreen',{lng});
    return;

    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);
    dispatch(requestLogin(params));
  };

  return (
    <>
      <ScrollView contentContainerStyle={loginPageStyle.containerView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={GlobalLtrStyle.centeredView}>
            <Text style={[GlobalLtrStyle.bigHeader, {color: Colors.orange, width: '100%', textAlign: 'center'}]}>
              Anton
            </Text>
            <View style={[DoctorProfileLtrStyle.row, {justifyContent: 'space-between'}]}>
              <LoginOptions navigation={navigation}/>
            </View>
            <View style={[DoctorProfileLtrStyle.row, {marginVertical: Metrics.doubleBaseMargin}]}>
              <View style={[DoctorProfileLtrStyle.column, {width: '100%'}]}>
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
                <RegularButton
                  title={I18n.t('login')}
                  onPress={onLoginPress}
                  buttonStyle={[
                    GlobalLtrStyle.buttonStyle,
                    {
                      marginTop: 50,
                      backgroundColor: Colors.orange,
                    },
                  ]}
                  containerStyle={{justifyContent: 'center', alignItems: 'center'}}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Auth', {screen: 'Register'})}
                >
                  <View style={[GlobalLtrStyle.row, GlobalLtrStyle.fullCenter, {marginTop: 15}]}>
                    <CustomIcons name="profile" color={Colors.black} size={Fonts.small}/>
                    <Text style={{marginLeft: 10}}>{I18n.t('register_instead')}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Auth', {screen: 'ForgotPassword'})}
                >
                  <View style={[GlobalLtrStyle.row, GlobalLtrStyle.fullCenter, {marginTop: 15}]}>
                    <CustomIcons name="lock" color={Colors.black} size={Fonts.small}/>
                    <Text style={{marginLeft: 10}}>{I18n.t('forgot_password')}</Text>
                  </View>
                </TouchableOpacity>
                <View style={[GlobalLtrStyle.lang_switcher,{display: 'none'}]}>
                  <TouchableOpacity onPress={() => {I18n.locale = 'ro'; setLng('ro')}}>
                    <Text style={lng == 'ro' ? GlobalLtrStyle.selected_lang : GlobalLtrStyle.unselected_lang}>RO</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {I18n.locale = 'en'; setLng('en')}}>
                    <Text style={lng != 'ro' ? GlobalLtrStyle.selected_lang : GlobalLtrStyle.unselected_lang}>EN</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
};

export default LoginScreen;
