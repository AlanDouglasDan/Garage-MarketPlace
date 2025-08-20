import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  tabBar: {
    height: 90,
    paddingTop: 10,
    backgroundColor: palette.WHITE,
    borderTopColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 50,
  },
  headerTitle: {
    ...typography.header22,
    color: palette.BLACK,
  },
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  text10: {
    ...typography.text12,
    color: palette.GREY2,
  },
  text10Focus: {
    ...typography.semiheader12,
    color: palette.BLACK,
  },
});
