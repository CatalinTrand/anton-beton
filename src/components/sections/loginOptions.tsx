import { Platform, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GlobalLtrStyle from '../../../shared/styles/global.ltr.style';
import { Colors, CustomIcons, Fonts, Metrics } from '../../../shared/themes';

const LoginOptions = ({ navigation }) => {
  const loginOptionsArray = [
    {
      id: 1,
      icon: 'google-login',
    },
    {
      id: 2,
      icon: 'facebook-login',
    },
  ];

  if (Platform.OS === 'ios') {
    loginOptionsArray.push({
      id: 3,
      icon: 'apple-login',
    });
  }

  const handleLoginOption = (item) => {
    console.warn(item.icon);
  };

  const renderOptions = loginOptionsArray.map((item, index) => {
    return (
      <TouchableOpacity
        onPress={() => handleLoginOption(item)}
        key={index.toString()}
        style={[{ width: `${95 / loginOptionsArray.length}%` }]}
      >
        <View style={[GlobalLtrStyle.iconTextWrapper, { padding: Metrics.baseMargin }]}>
          <CustomIcons name={item.icon} size={Fonts.h4} color={Colors.black} />
        </View>
      </TouchableOpacity>
    );
  });

  return <>{renderOptions}</>;
};

export default LoginOptions;
