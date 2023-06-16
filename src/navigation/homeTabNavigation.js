import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Colors, Font, Routes } from "../contants";
import { HomeScreen, MapScreen, MyInfoScreen } from "../pages";
import MovieScreen from "../pages/movie/movieScreen";
import UseBackHandler from "../hooks/useBackHandler";

const StatusBarHeight =
  Platform.OS === "ios" ? getStatusBarHeight(Platform.OS === "ios" ? true : false) : 0;

const Tab = createBottomTabNavigator();

function HomeTabNavigation() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      initialRouteName={Routes.HOME_TAB}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#333",
        tabBarLabelStyle: {
          fontSize: 11,
          letterSpacing: -0.5,
          fontFamily: Font.primary,
          //color: Colors.dark_grey,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = 22;
          if (route.name === Routes.HOME_MAIN) {
            iconName = focused ? "home-sharp" : iconName = "home-outline";
          } else if (route.name === Routes.MOVIE) {
            iconName = focused ? "ios-film" : iconName = "ios-film-outline";
            size = 23;
          } else if (route.name === Routes.MAP) {
            iconName = focused ? "ios-location-sharp" : iconName = "location-outline";
            size = 23;
          } else if (route.name === Routes.MYINFO) {
            iconName = focused ? "people" : iconName = "people-outline";
            size = 23;
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarStyle: {
          height: Platform.OS === "android" ? 60 : StatusBarHeight > 20 ? 92 : 60,
        },
        tabBarItemStyle: {
          margin: 8,
        },
      })}>
      <Tab.Screen name={Routes.HOME_MAIN} component={HomeScreen} options={{ title: "HOME" }} />
      <Tab.Screen name={Routes.MOVIE} component={MovieScreen}
                  options={{ title: "영화정보", headerShown: false }} />
      <Tab.Screen name={Routes.MAP} component={MapScreen}
                  options={{ title: "지도", headerShown: false }} />
      <Tab.Screen name={Routes.MYINFO} component={MyInfoScreen} options={{ title: "나의정보" }} />
    </Tab.Navigator>

  );
}

export default React.memo(HomeTabNavigation);
