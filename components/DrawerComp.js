import { LinearGradient } from "expo-linear-gradient";
import DrawerShelf from "./DrawerShelf";
import { View, StyleSheet, Alert } from "react-native";
import ImagePickerProfile from "./ImagePickerProfile";
import { useNavigation } from "@react-navigation/native";

const DrawerComp = ({ navigation }) => {
  const rateAppHandler = () => {
    Alert.alert("Rate Our App", "Comeing soon !");
  };

  const moveToHandler = (screen) => {
    navigation.closeDrawer();
    navigation.navigate(screen);
  };

  return (
    <LinearGradient
      colors={["#3A5F7E", "#92B3CF", "#3A5F7E"]}
      style={{ flex: 1 }}
    >
      <ImagePickerProfile />
      <View style={styles.container}>
        <DrawerShelf
          title="Top List"
          iconName="arrow-up"
          size={22}
          color="white"
          onPress={() => moveToHandler("MainTab")}
        />
        <DrawerShelf
          title="My Anime List"
          iconName="list"
          size={22}
          color="white"
          onPress={() => moveToHandler("MyAnimeList")}
        />
        <DrawerShelf
          title="Rate Our App"
          iconName="md-star"
          size={22}
          color="white"
          onPress={rateAppHandler}
        />
        <DrawerShelf
          title="About us"
          iconName="trash"
          size={22}
          color="white"
          onPress={() => moveToHandler("AboutUs")}
        />
      </View>
    </LinearGradient>
  );
};
export default DrawerComp;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
  },
  circle: {
    alignItems: "center",
    marginTop: 70,
  },
});
