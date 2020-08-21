import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from '../../I18n/I18n';
import noDataStyle from '../../styles/noData.ltr.style';
import Colors from '../../themes/Colors';

const noDataView = (data) => {
  const testId = `${data}_no_content`;
  return (
    <View testID={testId} style={{ flex: 1 }}>
      <View style={noDataStyle.containerView}>
        <Icon name="do-not-disturb" color={Colors.black} />
        <Text style={noDataStyle.text}>{I18n.t(data)}</Text>
      </View>
    </View>
  );
};

export default noDataView;
