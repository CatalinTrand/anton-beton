import { TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
// @ts-ignore
import { PropTypes } from 'prop-types';
import GlobalLtrStyle from '../../styles/global.ltr.style';
import { Colors, CustomIcons, Fonts } from '../../themes';
import I18n from '../../I18n/I18n';

const PasswordTextInput = (props) => {
  const { label, onChange } = props;
  const [icon, setIcon] = useState('eye-blocked');
  const [showPassword, setShowPassword] = useState(true);
  const changeState = () => {
    setIcon((prevState) => (prevState === 'eye' ? 'eye-blocked' : 'eye'));
    setShowPassword((prevState) => !prevState);
  };
  return (
    <View>
      <TextInput
        placeholder={I18n.t('password')}
        style={[
          GlobalLtrStyle.formTextInput,
          {
            paddingRight: 50,
          },
        ]}
        secureTextEntry={showPassword}
        onChangeText={(value) => onChange(value)}
        value={label}
      />
      <TouchableOpacity style={GlobalLtrStyle.hideIcon} onPress={changeState}>
        <CustomIcons name={icon} color={Colors.darkGrey} size={Fonts.h6} />
      </TouchableOpacity>
    </View>
  );
};
PasswordTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default PasswordTextInput;
