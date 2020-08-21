import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../themes';

const noDataStyle = StyleSheet.create({
  containerView: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.grey,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 20,
    marginHorizontal: 0,
  },
  text: {
    color: Colors.black,
    fontSize: Fonts.medium,
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
});
export default noDataStyle;
