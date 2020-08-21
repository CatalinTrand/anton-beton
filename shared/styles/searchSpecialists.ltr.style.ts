import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../themes';

const SearchSpecialistsLtrStyle = StyleSheet.create({
  headerWrapper: {
    paddingVertical: Metrics.doubleBaseMargin,
  },
  header: {
    color: Colors.orange,
    fontSize: Fonts.h3,
    fontWeight: 'bold',
  },
  categoriesWrapper: {
    marginHorizontal: Metrics.doubleBaseMargin,
    marginTop: Metrics.doubleBaseMargin,
  },
  categoryRow: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    borderLeftWidth: 1,
    borderLeftColor: Colors.grey,
    borderRightWidth: 1,
    borderRightColor: Colors.grey,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: Fonts.medium,
    color: Colors.black,
    fontWeight: 'bold',
  },
});

export default SearchSpecialistsLtrStyle;
