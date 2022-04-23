import { StyleSheet, Text } from "react-native";

const MyAppText = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default MyAppText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "harabara",
    fontSize: 14,
    letterSpacing: 0.7,
  },
});
