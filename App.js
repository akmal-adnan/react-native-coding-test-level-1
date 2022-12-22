import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ContactScreen from "./src/screens/ContactScreen";
import MainScreen from "./src/screens/MainScreen";

const App = () => {
  const [screen, setScreen] = useState("main");

  return (
    <View style={styles.container}>
      {screen === "main" ? (
        <MainScreen setScreen={setScreen} />
      ) : (
        <ContactScreen setScreen={setScreen} />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
