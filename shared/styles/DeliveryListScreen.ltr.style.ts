import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../themes';

const DeliveryListScreen = StyleSheet.create({
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
    color: Colors.black,
  },
  list: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  list_item: {
    paddingLeft: 5,
    paddingRight: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  title_contents: {
    paddingLeft: 10,
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  list_item_title: {
    fontSize: Fonts.h6,
    color: Colors.orange,
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item_in_delivery: {
    color: Colors.primary,
    marginLeft: 12,
    fontSize: Fonts.regular
  },
  list_item_supplier_name: {
    fontSize: Fonts.regular,
    color: Colors.darkGrey,
    paddingLeft: 10,
  },
  list_item_date_time: {
    fontSize: Fonts.medium,
    color: Colors.darkGrey,
    paddingLeft: 10,
  },
  list_item_details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  list_item_address: {
    width: '53%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    padding: 10
  },
  list_item_address_title: {
    fontSize: Fonts.regular,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  list_item_address_value: {
    fontSize: Fonts.small,
    fontWeight: 'bold',
    color: Colors.darkGrey,
  },
  list_item_additional_details: {
    width: '47%',
    padding: 0,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  list_item_detail: {
    paddingTop: 10,
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

export default DeliveryListScreen;
