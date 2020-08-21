import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
// @ts-ignore
import { PropTypes } from 'prop-types';
import DoctorCellLtrStyle from '../../../shared/styles/doctorCell.ltr.styles';
import { Colors, CustomIcons, Fonts } from '../../../shared/themes';
import I18n from '../../../shared/I18n/I18n';

const OfflineStatusBtn = ({ data, navigation }) => {
  return (
    <View
      style={[DoctorCellLtrStyle.wrapperRow, { margin: 0, backgroundColor: Colors.borderGrey }]}
    >
      <TouchableOpacity
        onPress={() => console.warn('let me know it is online')}
        style={[DoctorCellLtrStyle.buttonWrapper]}
      >
        <CustomIcons name="sound-alert" size={Fonts.medium} color={Colors.black} />
        <Text style={[DoctorCellLtrStyle.announceButton]}>
          {I18n.t('medical_app.doctors_list.let_me_know')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

OfflineStatusBtn.propTypes = {
  data: PropTypes.shape({}).isRequired,
};
export default OfflineStatusBtn;
