import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

const MainScreen = ({ setScreen }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setScreen("contact")}
        style={({ pressed }) => styles.contact__button(pressed)}
      >
        <Text style={{ fontSize: 16 }}>Contact Us</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  contact__button: (pressed) => ({
    backgroundColor: pressed ? "gray" : "lightgray",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 6,
  }),
});

export default MainScreen;
