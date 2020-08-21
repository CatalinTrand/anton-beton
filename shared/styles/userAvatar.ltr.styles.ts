import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../themes';

const UserAvatarLtrStyle = StyleSheet.create({
  UserAvatarImage: {
    borderRadius: 100,
    marginTop: 0,
    fontSize: Fonts.regular,
  },
  AvatarImage: {
    borderRadius: 100,
  },
  UserImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.greyBackground,
    borderRadius: 100,
  },
});

export default UserAvatarLtrStyle;
