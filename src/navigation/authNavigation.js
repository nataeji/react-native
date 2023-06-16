import React, { useEffect } from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { Routes } from "../contants";
import { LoginScreen, RegisterScreen } from "../pages";
import DrawerNavigation from "./drawerNavigation";
import UseBackHandler from "../hooks/useBackHandler";

const Stack = createStackNavigator();

function AuthNavigation() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth.login);
  useEffect(() => {
    console.log("Hello");
  }, [dispatch]);

  UseBackHandler();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS,
    }}>
      <Stack.Group>
        {
          !user ?
            (<>
              <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
              <Stack.Screen name={Routes.REGISTER} component={RegisterScreen} />
            </>) :
            (
              <Stack.Screen name={Routes.DRAWER} component={DrawerNavigation} />
            )
        }

      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={Routes.MODAL} component={RegisterScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

//React.memo()로 감싸는 이유는 Re-rendering을 막기 위해서.
export default React.memo(AuthNavigation);
