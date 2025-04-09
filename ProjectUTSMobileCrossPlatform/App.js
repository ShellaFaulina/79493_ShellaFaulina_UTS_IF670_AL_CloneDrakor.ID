import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthProvider, AuthContext } from "./AuthContext";

// Screens
import Home from "./MainScreen/Home";
import AllMovie from "./MainScreen/AllMovie";
import Genre from "./MainScreen/Genre";
import Histori from "./MainScreen/Histori";
import Bookmark from "./MainScreen/Bookmark";
import FAQ from "./InfoScreen/FAQ";
import About from "./InfoScreen/About";
import Setting from "./InfoScreen/Setting";
import Search from "./MainScreen/Search";
import Login from "./LoginScreen/Login";
import Register from "./LoginScreen/Register";
import ForgotPW from "./LoginScreen/ForgotPW";
import Updateinfo from "./InfoScreen/Updateinfo";
import DetailScreen from "./MainScreen/DetailScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const SplashScreen = ({ onFinish }) => {
  return (
    <View style={splashStyles.container}>
      <Image
        source={require("./assets/logoAPK.png")}
        style={splashStyles.logo}
      />
      <Text style={splashStyles.text}>Nonton Drama Sub Indo</Text>
      <Text style={splashStyles.subText}>LENGKAP</Text>
      <ActivityIndicator size="large" color="#1E90FF" style={splashStyles.loader} />
    </View>
  );
};

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: "#121212" }}>
    <View style={drawerStyles.header}>
      <Image source={require("./assets/logoAPK.png")} style={drawerStyles.logo} />
      <Text style={drawerStyles.appName}>Drakor ID</Text>
    </View>

    <View style={drawerStyles.menuSection}>
      <DrawerItemList {...props} />
    </View>

    <View style={drawerStyles.infoSection}>
      <Text style={drawerStyles.sectionHeader}>Informasi</Text>
      <DrawerItem
        label="FAQ"
        onPress={() => props.navigation.navigate("FAQ")}
        icon={({ focused }) => <Ionicons name="help-circle-outline" size={22} color={focused ? "#1E90FF" : "white"} />}
        labelStyle={drawerStyles.label}
      />
      <DrawerItem
        label="Update Info"
        onPress={props.openUpdateModal}
        icon={({ focused }) => <MaterialIcons name="system-update-alt" size={22} color={focused ? "#1E90FF" : "white"} />}
        labelStyle={drawerStyles.label}
      />
      <DrawerItem
        label="Tentang"
        onPress={() => props.navigation.navigate("About")}
        icon={({ focused }) => <Entypo name="info-with-circle" size={22} color={focused ? "#1E90FF" : "white"} />}
        labelStyle={drawerStyles.label}
      />
      <DrawerItem
        label="Pengaturan"
        onPress={() => props.navigation.navigate("Setting")}
        icon={({ focused }) => <Ionicons name="settings" size={22} color={focused ? "#1E90FF" : "white"} />}
        labelStyle={drawerStyles.label}
      />
    </View>
  </DrawerContentScrollView>
);

const DrawerNavigator = ({ openUpdateModal }) => {
  const { width, height } = useWindowDimensions();

  return (
    <Drawer.Navigator
      key={width > height ? "landscape" : "portrait"}
      drawerContent={(props) => <CustomDrawerContent {...props} openUpdateModal={openUpdateModal} />}
      screenOptions={({ navigation }) => ({
        drawerStyle: { backgroundColor: "#121212" },
        drawerActiveTintColor: "#1E90FF",
        drawerInactiveTintColor: "white",
        drawerLabelStyle: { fontSize: 14 },
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#121212" },
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Search")} style={{ marginRight: 15 }}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen name="Home" component={Home} options={{ drawerIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
      <Drawer.Screen name="Semua Drama" component={AllMovie} options={{ drawerIcon: ({ color }) => <FontAwesome5 name="fire" size={20} color={color} /> }} />
      <Drawer.Screen name="Genre" component={Genre} options={{ drawerIcon: ({ color }) => <Ionicons name="happy" size={24} color={color} /> }} />
      <Drawer.Screen name="Riwayat" component={Histori} options={{ drawerIcon: ({ color }) => <MaterialIcons name="history" size={24} color={color} /> }} />
      <Drawer.Screen name="Bookmark" component={Bookmark} options={{ drawerIcon: ({ color }) => <Ionicons name="bookmark" size={24} color={color} /> }} />
      <Drawer.Screen name="FAQ" component={FAQ} options={{ drawerItemStyle: { display: "none" } }} />
      <Drawer.Screen name="About" component={About} options={{ drawerItemStyle: { display: "none" } }} />
      <Drawer.Screen name="Setting" component={Setting} options={{ drawerItemStyle: { display: "none" } }} />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const openUpdateModal = () => setModalVisible(true);
  const closeUpdateModal = () => setModalVisible(false);

  useEffect(() => {
    const checkLogin = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
      setIsSplashVisible(false);
    };
    checkLogin();
  }, []);

  if (isSplashVisible) {
    return <SplashScreen onFinish={() => setIsSplashVisible(false)} />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="Main">
              {() => <DrawerNavigator openUpdateModal={openUpdateModal} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="ForgotPW" component={ForgotPW} />
            </>
          )}
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Updateinfo visible={modalVisible} onClose={closeUpdateModal} />
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001A44",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    color: "#FFF",
    fontSize: 16,
  },
  loader: {
    marginTop: 30,
  },
});

const drawerStyles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    backgroundColor: "#121212",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  appName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  menuSection: {
    paddingTop: 10,
  },
  infoSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingTop: 10,
  },
  sectionHeader: {
    color: "#aaa",
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 13,
  },
  label: {
    color: "white",
    fontSize: 14,
  },
});
