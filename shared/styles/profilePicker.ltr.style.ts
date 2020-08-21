import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../themes';

const ProfilePickerLtrStyle = StyleSheet.create({
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
  profile_list: {
    margin: 15,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: Colors.grey,
  },
  profile_details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey
  },
  profile_details_left: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  profile_details_right: {
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  profile_details_specialization: {
    fontSize: Fonts.medium,
    color: Colors.darkGrey
  },
  profile_details_name: {
    fontWeight: '700',
    fontSize: Fonts.input
  },
  new_profile: {
    borderWidth: 1,
    borderRadius: 7,
    margin: 15,
    borderColor: Colors.grey,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  new_profile_left: {
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  new_profile_right: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  new_profile_title: {
    fontSize: Fonts.input,
    color: Colors.orange
  },
  new_profile_description: {
    fontSize: Fonts.small,
    color: Colors.grey
  }
});

export default ProfilePickerLtrStyle;
