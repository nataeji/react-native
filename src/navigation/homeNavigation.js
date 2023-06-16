import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import HomeTabNavigation from "./homeTabNavigation";
import { Routes } from "../contants";
import CustomerPermissionModal from "../components/common/customerPermissionModal";

const Stack = createStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function HomeNavigation() {
  return (
    <>
      <CustomerPermissionModal />
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerShown: false,
      }}>
        <Stack.Screen name={Routes.HOME_TAB} component={HomeTabNavigation} />
      </Stack.Navigator>
    </>
  );
}

export default React.memo(HomeNavigation);
