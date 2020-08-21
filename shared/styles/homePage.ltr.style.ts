import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../themes';

const { width, height } = Dimensions.get('screen');
const HomePageLtrStyle = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.nearlyWhite,
    padding: Metrics.doubleBaseMargin,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.black,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  root: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    borderWidth: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 0,
  },
  greeting: {
    color: '#81C784',
    fontWeight: 'bold',
  },
  logo: {
    width: 96,
    height: 88,
  },
  homepageImage: {
    width: '100%',
    justifyContent: 'center',
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin,
    height: height / 3,
    resizeMode: 'contain',
  },
  nameApp: {
    textAlign: 'center',
    width: '100%',
    textTransform: 'uppercase',
    letterSpacing: 4,
    fontWeight: 'bold',
    margin: 10,
    fontSize: Fonts.medium,
  },
  childrenRow: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: Metrics.baseMargin,
  },
  homepageHeader: {
    fontSize: Fonts.h4,
    fontWeight: 'bold',
  },
  circle: {
    borderRadius: 100,
  },
});

export default HomePageLtrStyle;
