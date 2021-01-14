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
    color: Colors.orange,
  },
  searchAddress: {
    zIndex: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.black,
    paddingBottom: 10,
    borderTopColor: "#000000",
    borderTopWidth: 1,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  searchAddressInput: {
    zIndex: 0,
    fontSize: Fonts.medium,
    color: Colors.white,
    marginLeft: 10,
    borderRadius: 7,
    width: '85%',
  },
  searchIcon: {
    padding: 10,
    marginRight: 25,
    marginTop: 15,
    color: Colors.white,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
  },
  button: {
    marginTop: 'auto',
    marginBottom: 70,
    padding: 10,
    borderRadius: 7,
    backgroundColor: Colors.yellow,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button_disabled: {
    marginTop: 'auto',
    marginBottom: 70,
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
    color: Colors.black,
    fontSize: Fonts.regular
  },
  button_disabled_text: {
    color: Colors.darkGrey,
    fontSize: Fonts.regular
  },
  recenter_button: {
    backgroundColor: Colors.lightGrey,
    padding: 5,
    opacity: 0.6,
    borderRadius: 10,
    marginTop: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 10,
  },
});

export default MapScreenLtrStyle;
