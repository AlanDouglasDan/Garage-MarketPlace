import { Platform, StyleSheet } from 'react-native';

import { palette, typography } from 'core/styles';

export default StyleSheet.create({
  input: {
    ...typography.text16,
    width: '100%',
    // borderWidth: 2,
    // borderColor: palette.GREY,
    padding: 16,
    backgroundColor: palette.WHITE,
    borderRadius: 12,
    marginTop: 12,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
    }),
    color: palette.BLACK,
  },
  inputFocus: {
    borderWidth: 1,
    borderColor: palette.BLACK,
  },
  inputError: {
    borderWidth: 2,
    borderColor: palette.RED,
  },
  disabled: {
    // backgroundColor: palette.GREY2,
  },
  label: {
    ...typography.text18,
    color: palette.BLACK,
  },
  textError: {
    ...typography.text14,
    color: palette.RED,
    marginTop: 4,
  },
  icon: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 2,
  },
  iconPadding: {
    paddingLeft: 54,
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: '42%',
    transform: [{ translateY: -10 }],
    padding: 8,
    zIndex: 2,
  },
  passwordToggleText: {
    ...typography.semiheader14,
    color: palette.BLUE,
  },
  inputWithToggle: {
    paddingRight: 60, // Make room for the toggle button
  },
});
