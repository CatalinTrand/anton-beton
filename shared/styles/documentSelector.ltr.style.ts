import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../themes';

const DocumentSelectorLtrStyle = StyleSheet.create({
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
    marginTop: 15,
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
  documents_list: {
    padding: 15,
  },
  documents_month: {
    display: 'flex',
    flexDirection: 'column',
  },
  documents_month_header: {
    fontSize: Fonts.input,
    color: Colors.grey,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  file_list: {
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  file: {
    padding: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey
  },
  file_left: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
  },
  file_details: {
    paddingLeft: 15,
  },
  file_name: {
    fontWeight: 'bold',
    fontSize: Fonts.medium,
  },
  file_name_investigation: {
    fontWeight: 'bold',
    fontSize: Fonts.regular,
  },
  file_date: {
    fontSize: Fonts.small,
    color: Colors.darkGrey,
  },
  checkbox: {
    color: Colors.orange,
    marginRight: 10,
  }
});

export default DocumentSelectorLtrStyle;
