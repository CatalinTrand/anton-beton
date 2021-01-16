import React, {useState} from 'react';
import {
  Keyboard,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Switch
} from 'react-native';
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
import {getRequest, postRequest} from "../../requestHandler";
import SyncStorage from 'sync-storage';


const LoginScreen = ({navigation}): JSX.Element => {
  I18n.locale = 'ro';
  const [lng, setLng] = useState(I18n.locale);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  if(SyncStorage.get("token"))
    navigation.navigate('DisplayScreen', {lng, isSupplier: isEnabled});

  const onLoginPress = () => {
    const params = {email: "", password: "", deviceID: "", firebaseToken: ""};
    let deviceID = SyncStorage.get('deviceID');
    console.log("device: " + deviceID);
    if (deviceID == null)
      getRequest("uuid", null, response => {
        if (response.data.success) {
          deviceID = response.data.uuid;
          SyncStorage.set('deviceID', deviceID);
          let firebaseToken = SyncStorage.get("firebaseToken");
          if(firebaseToken == null) {
            firebaseToken = "nuKaXrFuzjk8xTfoqkUWPxFrHeLA7pEJeqBotbdd";
            SyncStorage.set("firebaseToken", firebaseToken);
          }
          params.email = email;
          params.password = password;
          params.deviceID = deviceID;
          params.firebaseToken = firebaseToken;
          postRequest(isEnabled ? "supplier/user/login" : "client/user/login", params, null, response2 => {
            if (response2.data) {
              console.log("token", response2.data.data.accessToken);
              SyncStorage.set("token", response2.data.data.accessToken);
              console.log(SyncStorage.get("token"));
              navigation.navigate('DisplayScreen', {lng, isSupplier: isEnabled});
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
      let firebaseToken = SyncStorage.get("firebaseToken");
      if(firebaseToken == null) {
        firebaseToken = "nuKaXrFuzjk8xTfoqkUWPxFrHeLA7pEJeqBotbdd";
        SyncStorage.set("firebaseToken", firebaseToken);
      }
      params.firebaseToken = firebaseToken;
      postRequest(isEnabled ? "supplier/user/login" : "client/user/login", params, null, response => {
        if (response.data) {
          console.log("token", response.data.data.accessToken);
          SyncStorage.set("token", response.data.data.accessToken);
          console.log(SyncStorage.get("token"));
          navigation.navigate('DisplayScreen', {lng, isSupplier: isEnabled});
        }
      });
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={loginPageStyle.containerView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={GlobalLtrStyle.centeredView}>
            <Image
              style={{
                minWidth: '25%',
                maxWidth: '50%',
                minHeight: '10%',
                maxHeight: '15%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 60,
                marginTop: 20
              }}
              source={require("../../assets/images/bild.png")}
            />
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
                <RegularButton
                  title={I18n.t('login')}
                  onPress={onLoginPress}
                  buttonStyle={[
                    GlobalLtrStyle.buttonStyle,
                    {
                      marginTop: 50,
                      color: Colors.black,
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
                <View style={[GlobalLtrStyle.lang_switcher, {display: 'none'}]}>
                  <TouchableOpacity onPress={() => {
                    I18n.locale = 'ro';
                    setLng('ro')
                  }}>
                    <Text style={lng == 'ro' ? GlobalLtrStyle.selected_lang : GlobalLtrStyle.unselected_lang}>RO</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    I18n.locale = 'en';
                    setLng('en')
                  }}>
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
