import React from 'react';
import { Platform } from 'react-native';
import { Header as ElementHeader } from 'react-native-elements';
import { Colors } from '../../../shared/themes';

const Header = (props): JSX.Element => {
  return (
    <ElementHeader
      {...props}
      containerStyle={{
        marginTop: 20,
        backgroundColor: Colors.black,
        justifyContent: 'space-around',
        shadowColor: Colors.black,
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: props.noBorder ? -5 : 0,
        paddingBottom: props.containerPaddingBottom ? props.containerPaddingBottom : 0,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: props.noBorder ? 0 : 1,
        ...Platform.select({ android: { paddingTop: 0 }, ios: {} }),
        ...Platform.select({ android: { height: 50 }, ios: {} }),
      }}
      statusBarProps={{ height: 60 }}
    />
  );
};

export default Header;
