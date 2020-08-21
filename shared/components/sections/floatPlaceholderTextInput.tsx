import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
/* eslint-disable no-param-reassign */
// @ts-ignore
import { PropTypes } from 'prop-types';
import GlobalLtrStyle from '../../styles/global.ltr.style';
import { Colors, CustomIcons, Fonts } from '../../themes';

const FloatPlaceholderTextInput = (props) => {
  const { label, onChange, value, extraStyle, type } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [icon, setIcon] = useState('eye-blocked');
  const [showPassword, setShowPassword] = useState(true);
  const changeState = () => {
    setIcon((prevState) => (prevState === 'eye' ? 'eye-blocked' : 'eye'));
    setShowPassword((prevState) => !prevState);
  };
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const fixExpirationCard = (text) => {
    if (text.length === 2 && Number(value) === 1) {
      text += '/';
    } else if (text.length === 2 && value.length === 3) {
      text = text.substring(0, text.length - 1);
    }
    onChange(text);
  };
  const renderType = () => {
    switch (type) {
      case 'password':
        return (
          <>
            <TextInput
              style={[
                GlobalLtrStyle.formTextInput,
                {
                  paddingRight: 50,
                  backgroundColor: !isFocused ? Colors.borderGrey : 'transparent',
                  borderWidth: !isFocused ? 0 : 1,
                  borderColor: !isFocused ? 'transparent' : Colors.orange,
                },
              ]}
              secureTextEntry={showPassword}
              onChangeText={(t) => onChange(t)}
              value={value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              blurOnSubmit
            />
            <TouchableOpacity style={GlobalLtrStyle.hideIcon} onPress={changeState}>
              <CustomIcons name={icon} color={Colors.darkGrey} size={Fonts.h6} />
            </TouchableOpacity>
          </>
        );
      case 'expiration':
        return (
          <TextInput
            onChangeText={(txt) => fixExpirationCard(txt)}
            style={[
              GlobalLtrStyle.formTextInput,
              {
                backgroundColor: !isFocused ? Colors.borderGrey : 'transparent',
                borderWidth: !isFocused ? 0 : 1,
                borderColor: !isFocused ? 'transparent' : Colors.orange,
              },
            ]}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            blurOnSubmit
          />
        );
      default:
        return (
          <TextInput
            onChangeText={(txt) => onChange(txt)}
            style={[
              GlobalLtrStyle.formTextInput,
              {
                backgroundColor: !isFocused ? Colors.borderGrey : 'transparent',
                borderWidth: !isFocused ? 0 : 1,
                borderColor: !isFocused ? 'transparent' : Colors.orange,
              }, extraStyle
            ]}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            blurOnSubmit
          />
        );
    }
  };
  return (
    <View style={[extraStyle, { paddingTop: 18 }]}>
      <Text
        style={{
          position: 'absolute',
          left: !isFocused ? 10 : 20,
          top: !isFocused ? 32 : 8,
          zIndex: !isFocused && value.length ? 0 : 2,
          paddingHorizontal: 10,
          backgroundColor: !isFocused ? 'transparent' : Colors.white,
          fontSize: !isFocused ? Fonts.medium : Fonts.small,
          color: !isFocused ? Colors.black : Colors.orange,
        }}
      >
        {label}
      </Text>
      {renderType()}
    </View>
  );
};
FloatPlaceholderTextInput.defaultProps = {
  extraStyle: {},
};
FloatPlaceholderTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  extraStyle: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default FloatPlaceholderTextInput;
