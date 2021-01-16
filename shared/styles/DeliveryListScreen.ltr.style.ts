import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../themes';

const DeliveryListScreen = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.black,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 10,
    paddingBottom: 10,
  },
  title_text: {
    marginRight: 15,
    fontSize: Fonts.h5,
    color: Colors.orange,
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
    borderBottomColor: "#000000",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  title_contents: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  list_item_title: {
    fontSize: 12,
    color: Colors.black,
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
    fontSize: 14,
    color: Colors.darkGrey,
    fontWeight: "bold",
    paddingTop: 5,
  },
  list_item_date_time: {
    fontSize: 12,
    color: Colors.white,
  },
  list_item_details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  list_item_address: {
    width: '100%',
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
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
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
