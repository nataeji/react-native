import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import CustomerModal from "./src/components/common/customerModal";
import AuthNavigation from "./src/navigation/authNavigation";

function AppNavigation(){
  return(
    <>
      <CustomerModal />
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </>
  )
}

export default React.memo(AppNavigation);
