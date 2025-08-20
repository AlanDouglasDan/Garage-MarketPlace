import "react-native-get-random-values";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";

import { AppStackNav } from "@src/navigation";
import SheetsProvider from "providers";
import { navigationRef } from "navigation/utils";
import { toastConfig } from "core/toastConfig";
import { store } from "store/index";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <SheetsProvider>
            <StatusBar style="auto" />

            <AppStackNav />
          </SheetsProvider>
        </NavigationContainer>
      </Provider>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
