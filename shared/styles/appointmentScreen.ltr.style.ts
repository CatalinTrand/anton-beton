import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../themes';

const appointmentScreenLtrStyle = StyleSheet.create({
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
  inputs: {
    padding: 15,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.grey,
  },
  delivery_address: {
    marginTop: 10,
  },
  delivery_address_title: {
    fontSize: Fonts.h6,
    color: Colors.orange,
    fontWeight: 'bold',
  },
  delivery_address_value: {
    fontWeight: 'bold',
    paddingTop: 5,
    color: Colors.darkGrey,
    fontSize: Fonts.medium,
  },
  delivery_date_title: {
    fontWeight: 'bold',
    fontSize: Fonts.regular,
    color: Colors.black,
    marginTop: 30,
  },
  date_picker: {
    width: 200,
    marginTop: 10,
  },
  delivery_time_container: {
    padding: 10,
    paddingLeft: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  delivery_time_details: {
    marginLeft: 15,
    marginTop: 5,
    padding: 10,
    paddingLeft: 35,
    paddingRight: 35,
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    borderRadius: 7,
  },
  delivery_time_value: {
    fontSize: Fonts.medium
  }
});

export default appointmentScreenLtrStyle;
