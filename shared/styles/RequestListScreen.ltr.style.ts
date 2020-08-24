import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../themes';

const RequestListScreenLtrStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
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
});

export default RequestListScreenLtrStyle;
