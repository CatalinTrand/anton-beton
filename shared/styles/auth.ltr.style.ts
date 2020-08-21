import { StyleSheet } from 'react-native';
import { Colors } from '../themes';

const loginPageStyle = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    color: Colors.black,
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
});
export default loginPageStyle;
