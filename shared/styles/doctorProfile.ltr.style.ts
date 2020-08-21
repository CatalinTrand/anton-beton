import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../themes';

const DoctorProfileLtrStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowWrapper: {
    borderBottomColor: Colors.grey,
    padding: Metrics.baseMargin,
  },
  rowNoMargin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  iconWrapper: {
    paddingHorizontal: Metrics.baseMargin,
  },
  wrapperRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: Metrics.baseMargin,
  },
  subtitle: {
    color: Colors.black,
    fontSize: Fonts.medium,
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
  reviewHeader: {
    fontSize: Fonts.h6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    padding: Metrics.baseMargin,
    fontWeight: 'bold',
  },
  name: {
    fontSize: Fonts.medium,
    fontWeight: 'bold',
  },
  date: {
    fontSize: Fonts.small,
    color: Colors.darkGrey,
  },
  rating: {
    fontSize: Fonts.medium,
    paddingHorizontal: 5,
    color: Colors.darkGrey,
  },
  message: {
    fontSize: Fonts.medium,
    padding: Metrics.baseMargin,
    color: Colors.darkGrey,
  },
  schedules: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    borderTopColor: "lightgray",
    borderTopWidth: 1,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    borderLeftColor: "lightgray",
    borderLeftWidth: 1,
    borderRightColor: "lightgray",
    borderRightWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  schedule_header: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  schedule_header_text: {
    fontWeight: 'bold',
    fontSize: Fonts.regular
  },
  day_schedule: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopColor: "lightgray",
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day_schedule_title: {
    fontWeight: 'normal',
    fontSize: Fonts.regular,
    paddingLeft: 10,
  },
  day_schedule_value: {
    fontWeight: 'bold',
    fontSize: Fonts.regular,
    paddingRight: 10
  },
  bottomButtons: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5
  }
});

export default DoctorProfileLtrStyle;
