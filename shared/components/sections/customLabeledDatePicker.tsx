import React, { useState } from 'react';
// @ts-ignore
import { PropTypes } from 'prop-types';
import { Text, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { atThisMoment, dateOf } from 'date-dealer';
import GlobalLtrStyle from '../../styles/global.ltr.style';

const LabeledDatePicker = ({ mode, label, initialDate, onOkayClicked, withLabel }) => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const toggleDatePicker = (visibilityState) => {
    setDatePickerVisible(visibilityState);
  };
  const dateSelected = (selectedDate) => {
    toggleDatePicker(false);
    onOkayClicked(selectedDate);
  };
  return (
    <View>
      {withLabel && <Text style={GlobalLtrStyle.labeledDatePickerLabel}>{label}</Text>}
      <View style={GlobalLtrStyle.labeledDatePicker}>
        <TouchableOpacity onPress={() => toggleDatePicker(true)}>
          <Text style={GlobalLtrStyle.labeledDatePickerText}>{initialDate || label}</Text>
        </TouchableOpacity>
        <DateTimePicker
          mode={mode}
          date={dateOf(atThisMoment('yyyy-mm-dd HH:MM'))}
          onConfirm={dateSelected}
          style={GlobalLtrStyle.labeledDatePicker}
          isVisible={datePickerVisible}
          onCancel={() => toggleDatePicker(false)}
        />
      </View>
    </View>
  );
};

LabeledDatePicker.propTypes = {
  mode: PropTypes.string.isRequired,
  label: PropTypes.string,
  withLabel: PropTypes.bool,
  initialDate: PropTypes.string,
  onOkayClicked: PropTypes.func.isRequired,
};
LabeledDatePicker.defaultProps = {
  label: '',
  withLabel: false,
  initialDate: '',
};
export default LabeledDatePicker;
