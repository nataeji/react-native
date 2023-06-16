import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Faq, Notice } from "../pages";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeNavigation from "./homeNavigation";
import { Colors, Font, Routes } from "../contants";
import CustomDrawer from "../components/common/customDrawer";
import NoticeScreen from "../pages/customer/noticeScreen";
import FaqScreen from "../pages/customer/faqScreen";

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={({ route }) => ({
        swipeEnabled: false,
        headerShown: false,
        swipeEdgeWidth: 0,
        drawerActiveBackgroundColor: Colors.primary,
        drawerActiveTintColor: Colors.white,
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 14,
          fontFamily: Font.primary,
        },
        drawerItemStyle: {
          padding: 0,
          // paddingLeft: 10,

          marginBottom: 0,
          marginTop: 0,
        },
        drawerIcon: ({ focused, color, size }) => {
          let iconName;
          size = 20;
          if (route.name === Routes.HOME_DRAWER) {
            iconName = focused ? "home-sharp" : "home-outline";

          } else if (route.name === Routes.NOTICE_DRAWER) {
            iconName = focused ? "ios-cafe-outline" : "ios-cafe-outline";
            size = 23;
          } else if (route.name === Routes.FAQ_DRAWER) {
            iconName = focused ? "ios-chatbubbles-outline" : "ios-chatbubbles-outline";
            size = 23;
          }
          return <Ionicons name={iconName} color={color} size={size} style={{ marginLeft: 10 }} />;
        },
      })
      }
    >
      <Drawer.Screen
        name={Routes.HOME_DRAWER}
        component={HomeNavigation}
        options={{ title: "홈으로 이동" }}
        listeners={({ navigation, route }) => ({
          drawerItemPress: (e) => {
            navigation.navigate(Routes.HOME_TAB, { screen: Routes.HOME_MAIN });
            e.preventDefault();
          },
        })} />
      <Drawer.Screen name={Routes.NOTICE_DRAWER} component={NoticeScreen} options={{ title: "공지사항" }} />
      <Drawer.Screen name={Routes.FAQ_DRAWER} component={FaqScreen} options={{ title: "자주하는 질문" }} />
    </Drawer.Navigator>
  );
}

export default React.memo(DrawerNavigation);
