import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  listingContainer: {
    borderRadius: 6,
    marginBottom: 16,
  },
  cardedContainer: {
    backgroundColor: palette.WHITE,
    padding: 12,
  },
  priceContainer: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: palette.ORANGE,
    paddingVertical: 6,
    paddingHorizontal: 16,
    zIndex: 3,
    borderRadius: 2,
  },
  priceText: {
    ...typography.semiheader14,
    color: palette.WHITE,
  },
  listingInfoContainer: {
    paddingVertical: 16,
  },
  gap: {
    gap: 8,
  },
  text14: {
    ...typography.text14,
    color: palette.BLACK,
  },
  semiheader18: {
    ...typography.semiheader18,
    color: palette.BLACK,
  },
  trashButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
});
