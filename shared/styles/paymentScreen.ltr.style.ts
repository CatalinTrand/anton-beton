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
