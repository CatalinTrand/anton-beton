import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../themes';

const MapScreenLtrStyle = StyleSheet.create({
  header_text: {
    paddingLeft: 15,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    width: '100%',
    height: 1000,
    backgroundColor: Colors.white,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 7,
    backgroundColor: Colors.orange,
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
  }
});

export default MapScreenLtrStyle;
