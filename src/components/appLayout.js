import React, { useCallback } from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
function AppLayout({title, children}){
  const navigation = useNavigation();
  const drawerHandler = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1, position:"relative" }}>
      <View style={styles.header_wrapper}>
        <TouchableOpacity onPress={drawerHandler}>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header_title}>{title}</Text>
        <Text></Text>
      </View>
      <View style={styles.content_container}>
        {children}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header_wrapper: {
    flexDirection: 'row',
    justifyContent:'space-between',
    height:50,
    alignItems:'center',
    backgroundColor:"#fff",
    paddingHorizontal:15,
    borderWidth:1,
    borderColor:"#eee",
  },
  content_container : {
    flex:1,
  },
  header_title : {
    fontSize:16,
    fontWeight:600,
    color:'#333'
  }
});
export default React.memo(AppLayout);
