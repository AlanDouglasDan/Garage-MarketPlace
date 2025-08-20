import { View, Text, Switch } from "react-native";
import { layout } from "core/styles";
import styles from "../Listings.styles";

export const renderGreeting = ({
  currentUser,
  isHost,
  toggleHostStatus,
}: any) => (
  <View style={[layout.spacedRow, styles.headerContainer]}>
    <Text style={styles.semiheader18}>
      Hello {currentUser ? currentUser.full_name.split(" ")[0] : "Guest"} 👋
    </Text>

    {currentUser && (
      <View style={layout.flexedRow}>
        <Text style={styles.semiheader16}>Is Host?</Text>
        <Switch value={isHost} onValueChange={toggleHostStatus} />
      </View>
    )}
  </View>
);
