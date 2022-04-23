import { StyleSheet, Image, Pressable } from "react-native";
import MyAppText from "./MyAppText ";
const AnimeItem = ({ imageUrl, title, onPress, modePressed }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && modePressed ? styles.pressed : null,
      ]}
    >

      <Image source={{ uri: `${imageUrl}` }} style={styles.image} />
      <MyAppText style={styles.text}>{title}</MyAppText>
    </Pressable>
  );
};

export default AnimeItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 8,
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 16,
  },
  pressed: {
    opacity: 0.75,
  },
});
