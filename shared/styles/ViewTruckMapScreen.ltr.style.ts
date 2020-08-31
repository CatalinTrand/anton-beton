import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../themes';

const ViewTruckMapScreenLtrStyle = StyleSheet.create({
  map: {
    flex: 1,
    zIndex: 1,
  },
  eta: {
    position: 'absolute',
    zIndex: 2,
    top: 75,
    left: 5,
    padding: 10,
    backgroundColor: Colors.lightGrey
  },
  button: {
    zIndex: 2,
    margin: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    borderRadius: 7,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    backgroundColor: Colors.orange,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  button_text: {
    color: Colors.white,
    fontSize: Fonts.regular
  },
});


export default ViewTruckMapScreenLtrStyle;


