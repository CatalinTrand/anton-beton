import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../themes';

const OrderScreenLtrStyle = StyleSheet.create({
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
  order_details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingBottom: 15,
    paddingLeft : 5,
    paddingRight : 5,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
  },
  order_address: {
    width: '53%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    paddingRight: 20,
    paddingBottom: 0,
  },
  order_address_title: {
    fontSize: Fonts.regular,
    fontWeight: 'bold',
  },
  order_address_value: {
    fontSize: Fonts.small,
    fontWeight: 'bold',
    color: Colors.darkGrey,
  },
  order_additional_details: {
    width: '47%',
    padding: 0,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  order_detail: {
    paddingTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  order_detail_title: {
    fontSize: Fonts.medium,
    fontWeight: 'bold',
    color: Colors.black,
  },
  order_detail_value: {
    paddingTop: 2,
    fontSize: Fonts.small,
    color: Colors.darkGrey,
  },
  offers_received: {
    fontSize: Fonts.h6,
    color: Colors.orange,
    padding: 13,
  },
  list: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  list_item: {
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.grey,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  list_item_title: {
    fontSize: Fonts.regular,
    color: Colors.orange,
    fontWeight: 'bold',
  },
  list_item_details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  list_item_left: {
    width: '55%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    padding: 15,
    paddingRight: 15,
    borderRightWidth: 1,
    borderRightColor: Colors.lightGrey,
  },
  list_item_time: {
    paddingTop: 7,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  list_item_time_title: {
    fontSize: Fonts.medium,
    fontWeight: 'bold',
    color: Colors.black,
  },
  list_item_time_value: {
    paddingTop: 2,
    fontSize: Fonts.small,
    color: Colors.darkGrey,
  },
  list_item_right: {
    width: '40%',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  list_item_detail: {
    paddingLeft: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  list_item_detail_title: {
    fontSize: Fonts.medium,
    fontWeight: 'bold',
    color: Colors.black,
  },
  list_item_detail_value: {
    paddingTop: 2,
    fontSize: Fonts.small,
    color: Colors.darkGrey,
  },
});

export default OrderScreenLtrStyle;
