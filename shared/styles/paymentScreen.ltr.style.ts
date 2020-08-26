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
  order_details: {
    padding: 20
  },
  order_title: {
    fontSize: Fonts.regular,
    color: Colors.orange,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  supplier_name: {
    fontSize: Fonts.medium,
    color: Colors.orange,
    paddingBottom: 10,
  },
  address: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },
  address_title: {
    fontSize: Fonts.medium,
    color: Colors.darkGrey,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  address_value: {
    fontSize: Fonts.small,
    color: Colors.darkGrey,
  },
  detail: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  detail_title: {
    fontSize: Fonts.small,
    color: Colors.black,
    fontWeight: 'bold',
  },
  detail_value: {
    fontSize: Fonts.small,
    color: Colors.darkGrey,
  },
  total_payment: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: Colors.grey,
    paddingTop: 10,
    marginTop: 10,
  },
  total_payment_title: {
    fontSize: Fonts.h6,
    color: Colors.black,
    fontWeight: 'bold',
  },
  total_payment_value: {
    fontSize: Fonts.regular,
    color: Colors.darkGrey,
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
