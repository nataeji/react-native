import React from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { Colors } from "../../contants";

function Loading() {
  return (
    <View style={styles.container}>
      <View style={styles.loading_box}>
        <ActivityIndicator color={Colors.primary} size={40} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -35,
    marginTop: -35,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    //backgroundColor:'rgba(0, 0, 0, 0.15)'
  },

  loading_box: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
    // borderWidth:1,
    // borderColor:'#eee',
  },
});
export default React.memo(Loading);
