import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../themes';

const PaymentScreenLtrStyle = StyleSheet.create({
  header_text: {
    paddingLeft: 15,
  },
  header_step_text: {
    color: Colors.grey,
    fontWeight: 'bold',
    fontSize: Fonts.h6,
  },
  header_schedule_text: {
    color: Colors.orange,
    fontWeight: 'bold',
    fontSize: Fonts.h3,
  },
  appointment: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 7,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: Colors.grey,
  },
  doctor_details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey
  },
  doctor_details_left: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  doctor_details_right: {
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  doctor_details_specialization: {
    fontSize: Fonts.medium,
    color: Colors.darkGrey
  },
  doctor_details_name: {
    fontWeight: '700',
    fontSize: Fonts.regular
  },
  date: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey
  },
  date_text: {
    color: Colors.black,
    fontSize: Fonts.regular,
    fontWeight: 'bold'
  },
  date_value: {
    color: Colors.darkGrey,
    fontSize: Fonts.regular,
    fontWeight: 'normal'
  },
  time: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey
  },
  time_text: {
    color: Colors.black,
    fontSize: Fonts.regular,
    fontWeight: 'bold'
  },
  time_value: {
    color: Colors.darkGrey,
    fontSize: Fonts.regular,
    fontWeight: 'normal'
  },
  price: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  price_top: {
    padding: 10,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price_top_left: {
    fontSize: Fonts.regular,
    color: Colors.black,
    fontWeight: 'bold',
  },
  price_top_right: {
    fontSize: Fonts.regular,
    color: Colors.darkGrey,
  },
  price_bottom: {
    padding: 10,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price_bottom_text: {
    color: Colors.darkGrey,
    fontSize: Fonts.small,
  },
  card_details: {
    padding: 15,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card_inputs: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: Fonts.regular,
    fontWeight: 'bold',
    borderRadius: 7,
    backgroundColor: Colors.lightGrey,
    marginBottom: 15,
  }
});

export default PaymentScreenLtrStyle;
