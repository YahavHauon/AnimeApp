import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import IconButton from "./components/IconButton";
import AnimeDetail from "./screens/AnimeDetail";
import MainScreen from "./screens/MainScreen";
import { GeneralContextProvider } from "./store/GeneralContext";
import { Colors } from "./util/Colors";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutUs from "./screens/AboutUs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddAnime from "./screens/AddAnime";
import DrawerComp from "./components/DrawerComp";
import { Ionicons } from "@expo/vector-icons";
import { RootSiblingParent } from "react-native-root-siblings";
import MyAnimeList from "./screens/MyAnimeList";
import { screens, screensNames } from "./util/screens";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerNavigator = (mainScreen) => {
  return (
    <Drawer.Navigator
      initialRouteName={mainScreen}
      drawerContent={(props) => {
        return <DrawerComp {...props} />;
      }}
      screenOptions={{
        headerStyle: { backgroundColor: Colors.headerAppColor },
        sceneContainerStyle: { backgroundColor: Colors.backgroundScreen },
        headerTintColor: "white",
      }}
    >
      <Drawer.Screen
        name={screensNames.topList}
        component={TabNavigator}
        options={{ title: screens.mainTitle }}
      />
      <Drawer.Screen
        name={screensNames.AboutUs}
        component={AboutUs}
        options={{ title: screens.aboutUs }}
      />
    </Drawer.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={screensNames.mainTab}
        component={MainScreen}
        options={{
          title: screens.topList,
          headerTintColor: "white",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-list-circle" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={screensNames.AddAnime}
        component={AddAnime}
        options={{
          headerStyle: { backgroundColor: Colors.headerAppColor },
          title: screens.addAnime,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "square-peg": require("./fonts/SquarePeg-Regular.ttf"),
    harabara: require("./fonts/Harabara.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="light" />
      <GeneralContextProvider>
        <RootSiblingParent>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: Colors.headerAppColor },
                headerTintColor: "white",
                contentStyle: { backgroundColor: Colors.backgroundScreen },
              }}
            >
              <Stack.Screen
                name={screensNames.HomePage}
                component={DrawerNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={screensNames.MyAnimeList}
                component={MyAnimeList}
                options={{ title: screens.myAnimeList }}
              />
              <Stack.Screen
                name={screensNames.AnimeDetail}
                component={AnimeDetail}
                options={({ route, navigation }) => {
                  return {
                    title: route.params.anime.title,
                    headerRight: () => (
                      <IconButton
                        icon="share-outline"
                        size={22}
                        color="white"
                        onPress={() => {
                          navigation.setParams({ share: true });
                        }}
                      />
                    ),
                  };
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </RootSiblingParent>
      </GeneralContextProvider>
    </>
  );
}
