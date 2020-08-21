import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../themes';

const DoctorCellLtrStyle = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    marginVertical: Metrics.baseMargin,
  },
  avatar: {
    alignSelf: 'center',
    borderRadius: 100,
    padding: 2,
    marginRight: 20,
  },
  wrapperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: Metrics.baseMargin,
  },
  name: {
    fontSize: Fonts.input,
    color: Colors.black,
    fontWeight: 'bold',
    marginRight: 50,
    marginVertical: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightData: {
    flexDirection: 'column',
    flex: 2,
  },
  ratingText: {
    color: Colors.darkGrey,
    fontSize: Fonts.small,
    paddingHorizontal: 5,
  },
  specialization: {
    color: Colors.darkGrey,
    fontSize: Fonts.small,
    textTransform: 'capitalize',
  },
  announceButton: {
    color: Colors.black,
    fontSize: Fonts.small,
    paddingHorizontal: 10,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  options: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 10,
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    flexDirection: 'row',
  },
  filters: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: Colors.orange,
    borderRadius: 25,
    overflow: 'hidden',
  },
});

export default DoctorCellLtrStyle;
