import React, { useCallback, useRef } from "react";
import ActionSheet from "react-native-actions-sheet";
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, Font } from "../../contants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

function CustomBottomModal({item}) {
  const actionSheetRef = useRef(null);
  const showBottomSheet = useCallback(() => {
    actionSheetRef.current?.show();
  }, []);

  return (
    <>
      <Pressable onPress={showBottomSheet} style={styles.notice_button}>
        <View style={styles.notice}>
          <Ionicons name="ios-film-outline" size={25} color={Colors.white} />
          <Text style={styles.notice_label}><Text style={styles.movie_info}>{item.title}</Text> 상세정보보기</Text>
        </View>
      </Pressable>
      <ActionSheet
        ref={actionSheetRef}
        backgroundInteractionEnabled={false}
        onBeforeShow={() => {
          console.log("sheet payload");
        }}
        //snapPoints={[30, 60, 100]}
        initialSnapIndex={0}
        drawUnderStatusBar={false}
        gestureEnabled={true}
        defaultOverlayOpacity={0.6}
        initialOffsetFromBottom={2}
        bounciness={0}

        indicatorStyle={{
          width: 50,
          backgroundColor: "#212030",
        }}

        containerStyle={{
          paddingHorizontal: 0,
          paddingVertical: 0,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        springOffset={100}
      >
        <ScrollView style={{height:350}}>
          <View style={styles.bottom_container}>
            <View style={styles.movie_row}>
              <Text>제목 : {item?.title}</Text>
            </View>
            <View style={styles.movie_row}>
              <Text>내용 : {item?.overview}</Text>
            </View>
            <View style={styles.movie_row}>
              <Text>투표 : {item?.vote_count}</Text>
            </View>
            <View style={styles.movie_row}>
              <Text>평균 : {item?.vote_average}</Text>
            </View>
          </View>
        </ScrollView>
      </ActionSheet>
    </>
  );
}

const styles = StyleSheet.create({
  bottom_container: {
    padding:20,
  },
  notice_button: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  notice: {
    width: width,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#333",
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.62,
  },
  movie_row: {
    marginBottom:10,
  },
  notice_label: {
    fontSize: 16,
    marginLeft: 5,
    fontFamily: Font.primary,
    color: Colors.white,
    letterSpacing: -1,

  },

  banner: {
    height: 240,
    width: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },

  movie_info: {
    color: Colors.primary,
    marginRight:10,
  },
});
export default React.memo(CustomBottomModal);
