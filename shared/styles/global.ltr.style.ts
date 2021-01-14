import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../themes';

const GlobalLtrStyle = StyleSheet.create({
  FlexView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  HamburgerIcon: {
    color: Colors.black,
    marginVertical: 10,
    marginLeft: 10,
  },
  headerText: {
    color: Colors.black,
    fontSize: Fonts.regular,
    paddingHorizontal: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    margin: Metrics.doubleBaseMargin,
  },
  bigHeader: {
    fontSize: Fonts.h3,
    fontWeight: 'bold',
    marginBottom: Metrics.doubleBaseMargin,
  },
  headline: {
    fontSize: Fonts.regular,
    fontWeight: 'bold',
  },
  iconTextWrapper: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 10,
    width: '100%',
  },
  iconText: {
    fontWeight: '600',
    fontSize: Fonts.medium,
    marginTop: Metrics.baseMargin,
  },
  formTextInput: {
    height: 50,
    color: Colors.black,
    fontSize: Fonts.small,
    borderRadius: 10,
    padding: Metrics.baseMargin,
  },
  hideIcon: {
    position: 'absolute',
    right: 12,
    top: 30,
  },
  buttonStyle: {
    width: '100%',
    margin: Metrics.baseMargin,
    borderRadius: 10,
    padding: 12,
    color: Colors.black
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  borderedRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.grey,
    padding: Metrics.baseMargin,
    alignItems: 'center',
    borderRadius: 10,
  },
  fullCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerDropdownWrapper: {
    borderRadius: 10,
    color: Colors.black,
    fontSize: Fonts.small,
    paddingHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.borderGrey,
    marginTop: Metrics.doubleBaseMargin,
    height: 50,
  },
  pickerDropdown: {
    width: '100%',
  },
  labeledDatePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  labeledDatePickerLabel: {
    paddingHorizontal: 0,
    textAlign: 'left',
    width: '95%',
  },
  labeledDatePickerText: {
    color: Colors.black,
    textAlign: 'left',
    fontSize: Fonts.medium,
    width: '100%',
    paddingHorizontal: Metrics.baseMargin,
  },
  dots: {
    color: Colors.darkGrey,
    width: 10,
    height: 10,
    borderRadius: 100,
  },
  lang_switcher: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected_lang: {
    marginLeft: 7,
    marginRight: 7,
    fontSize: Fonts.regular,
    color: Colors.primaryDark,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: Colors.primaryDark
  },
  unselected_lang: {
    marginLeft: 7,
    marginRight: 7,
    fontSize: Fonts.regular,
    color: Colors.darkGrey
  }
});

export default GlobalLtrStyle;
