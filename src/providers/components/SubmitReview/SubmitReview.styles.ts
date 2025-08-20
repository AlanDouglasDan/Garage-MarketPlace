import {StyleSheet, Platform} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 0 : 32,
    paddingHorizontal: 20,
  },
  sheetModal: {
    flex: 1,
    backgroundColor: 'rgba(11, 15, 23, 0.25)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  header18: {
    ...typography.header18,
    color: palette.BLACK,
    marginTop: 8,
  },
  flexedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
