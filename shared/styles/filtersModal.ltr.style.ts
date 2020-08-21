import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../themes';

const FiltersModalLtrStyle = StyleSheet.create({
  row: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: Fonts.h5,
    fontWeight: 'bold',
    color: Colors.black,
    marginHorizontal: Metrics.doubleBaseMargin,
    marginVertical: Metrics.baseMargin,
  },
  subheader: {
    fontSize: Fonts.regular,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: Colors.grey,
    paddingVertical: Metrics.baseMargin,
  },
  text: {
    fontSize: Fonts.regular,
    color: Colors.black,
    fontWeight: 'bold',
    marginBottom: Metrics.doubleBaseMargin,
  },
  textBtn: {
    fontSize: Fonts.regular,
    color: Colors.black,
    fontWeight: 'bold',
    marginVertical: Metrics.baseMargin,
    paddingLeft: 10,
  },
  box: {
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: Metrics.doubleBaseMargin,
    paddingVertical: 5,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 100,
  },
});

export default FiltersModalLtrStyle;
