import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../themes';

const MapScreenLtrStyle = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
  },
  topPart: {
    zIndex: 0,
  },
  header_text: {
    paddingLeft: 15,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  title_text: {
    fontSize: Fonts.h5,
    fontWeight: 'bold',
    color: Colors.orange,
  },
  searchAddress: {
    zIndex: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.white,
    paddingBottom: 10,
  },
  searchAddressInput: {
    zIndex: 0,
    fontSize: Fonts.medium,
    marginLeft: 10,
    borderRadius: 7,
    width: '85%'
  },
  searchIcon: {
    padding: 10,
    marginRight: 25,
    marginTop: 15,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  button: {
    marginTop: 'auto',
    marginBottom: 20,
    padding: 10,
    borderRadius: 7,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    backgroundColor: Colors.orange,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button_disabled: {
    marginTop: 'auto',
    marginBottom: 20,
    padding: 10,
    borderRadius: 7,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    backgroundColor: Colors.grey,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button_text: {
    color: Colors.white,
    fontSize: Fonts.regular
  },
  button_disabled_text: {
    color: Colors.darkGrey,
    fontSize: Fonts.regular
  }
});

export default MapScreenLtrStyle;
