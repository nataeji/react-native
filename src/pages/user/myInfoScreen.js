import React from "react";
import { Text, View } from "react-native";
import AppLayout from "../../components/appLayout";


function MyInfoScreen() {
  return (
    <AppLayout title={"MYINFO"}>
      <View>
        <Text>MyInfo Screen</Text>
      </View>
    </AppLayout>
  );
}

export default React.memo(MyInfoScreen);
