import { TouchableOpacity, View } from 'react-native';
import React from 'react';
// @ts-ignore
import { PropTypes } from 'prop-types';
import DoctorCellLtrStyle from '../../../shared/styles/doctorCell.ltr.styles';
import { Colors, CustomIcons, Fonts, Metrics } from '../../../shared/themes';

const OnlineStatusBtns = ({ data, navigation }) => {
  return (
    <View
      style={[
        DoctorCellLtrStyle.wrapper,
        { margin: Metrics.doubleBaseMargin, flexDirection: 'row' },
      ]}
    >
      <TouchableOpacity
        onPress={() => console.warn('audio call')}
        style={[DoctorCellLtrStyle.iconWrapper]}
      >
        <CustomIcons name="audio-call" color={Colors.black} size={Fonts.medium} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.warn('video call')}
        style={[
          DoctorCellLtrStyle.iconWrapper,
          {
            borderLeftColor: Colors.grey,
            borderLeftWidth: 1,
            borderRightColor: Colors.grey,
            borderRightWidth: 1,
          },
        ]}
      >
        <CustomIcons name="video-call" color={Colors.black} size={Fonts.medium} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.warn('send message')}
        style={[DoctorCellLtrStyle.iconWrapper]}
      >
        <CustomIcons name="chat-message" color={Colors.black} size={Fonts.medium} />
      </TouchableOpacity>
    </View>
  );
};
OnlineStatusBtns.propTypes = {
  data: PropTypes.shape({}).isRequired,
};
export default OnlineStatusBtns;
