import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../themes';

const ScheduleCalendarLtrStyle = StyleSheet.create({
  header_text: {
    paddingLeft: 15,
  },
  header_step_text: {
    color: Colors.grey,
    fontWeight: 'bold',
    fontSize: Fonts.h6,
  },
  header_schedule_text: {
    color: Colors.orange,
    fontWeight: 'bold',
    fontSize: Fonts.h3,
  },
  doctor_details: {
    margin: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey
  },
  doctor_details_left: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  doctor_details_right: {
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  doctor_details_specialization: {
    fontSize: Fonts.medium,
    color: Colors.darkGrey
  },
  doctor_details_name: {
    fontWeight: '700',
    fontSize: Fonts.input
  },
  calendar: {

  },
  hours_container: {
    marginLeft: 15,
    marginRight: 15,
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 7
  },
  hours_title: {
    paddingTop: 15,
    paddingLeft: 15,
    fontSize: Fonts.regular,
    fontWeight: 'bold',
    color: Colors.black
  },
  hours: {
    paddingBottom: 15,
    width: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  single_hour: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 15,
  },
  single_hour_text: {
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: Fonts.regular
  }
});

export default ScheduleCalendarLtrStyle;
