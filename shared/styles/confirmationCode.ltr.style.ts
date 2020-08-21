import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../themes';

const confirmationCodeStyle = StyleSheet.create({
  codeFiledRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 50,
    fontSize: Fonts.input,
    borderRadius: 10,
    backgroundColor: Colors.borderGrey,
    borderWidth: 2,
    borderColor: Colors.borderGrey,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: Colors.orange,
  },
});
export default confirmationCodeStyle;
