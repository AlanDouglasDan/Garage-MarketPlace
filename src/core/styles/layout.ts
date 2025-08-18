import { StyleSheet } from 'react-native';

export const layout = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacedStartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredColumn: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  flexedEnd: {
    alignItems: 'flex-end',
  },
  alignCenter: {
    alignSelf: 'center',
  },
  alignEnd: {
    alignSelf: 'flex-end',
  },
});
