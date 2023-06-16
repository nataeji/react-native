import React, { useCallback, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Image,
} from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import EncryptedStorage from "react-native-encrypted-storage";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Colors, Font, Routes } from "../../contants";
import { closeModal, openModal } from "../../store/slice/modal";

const StatusBarHeight =
  Platform.OS === "ios" ? getStatusBarHeight(Platform.OS === "ios" ? true : false) : 0;

function CustomDrawer(props) {
  const dispatch = useDispatch();
  const { navigation } = props;
  const closeHandler = useCallback(() => {
      navigation.closeDrawer();
    },
    [],
  );

  const logoutHandler = useCallback(() => {
    const sendData = {
      title: "로그아웃 알림",
      content: "정말로 로그아웃 하시겠습니까?",
      confirmFn: async () => {
        dispatch(closeModal());
        await EncryptedStorage.removeItem("token");
      },
      cancelFn: () => {
        dispatch(closeModal());
      },
    };
    dispatch(openModal(sendData));
    return true;
  }, []);

  return (
    <>
      <DrawerContentScrollView {...props} style={{ marginTop: -4 }}>
        <View style={styles.profile_container}>
          <View style={styles.logo_wrapper}>
            <Text style={styles.logo_text}>Navigator</Text>
            <TouchableOpacity onPress={closeHandler}>
              <View style={styles.close_btn_wrapper}>
                <Ionicons name="close" size={25} color={Colors.white} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.profile_text_wrapper}>
            <View><Text style={styles.profile_text}>안녕하세요. 회원님!</Text></View>
            <View><Text style={styles.profile_phone_number}></Text></View>
          </View>
          <Text style={styles.profile_small_text}>Navigator에 오신것을 환영합니다.</Text>
        </View>

        <View style={styles.item_list}>
          <DrawerItemList
            {...props}
            style={{ marginBottom: 0 }}
          />
        </View>
      </DrawerContentScrollView>
      <View style={styles.drawer_sub_menu}>
        <TouchableOpacity onPress={logoutHandler}>
          <View style={styles.sub_menu_list}>
            <View style={styles.sub_menu_content}>
              <Ionicons name="ios-power-sharp" size={22} />
              <Text style={styles.drawer_menu_label}>로그아웃</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profile_container: {
    backgroundColor: Colors.primary,
    height: 120,
  },
  logo_wrapper: {
    height: 50,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo_text: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: Font.primary,
    letterSpacing: -1,
    fontWeight: 700,
    paddingLeft: 20,
  },
  profile_text_wrapper: {
    paddingHorizontal: 10,
    marginBottom: 2,
    paddingLeft: 30,
    flexDirection: "row",
    alignItems: "center",
  },

  profile_text: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: -1,
    color: "#fff",
  },

  profile_phone_number: {
    paddingLeft: 5,
    color: Colors.white,
    fontSize: 13,

  },

  close_btn_wrapper: {
    padding: 3,
  },

  profile_small_text: {
    paddingHorizontal: 10,
    fontSize: 12,
    color: Colors.white,
    paddingLeft: 30,
    letterSpacing: -0.5,
    fontFamily: Font.secondary,
    fontWeight: 300,
    marginTop: 3,
  },

  profile_img: {
    position: "absolute",
    zIndex: 1,
    width: "94%",
    height: 95,
    left: 7,
    borderWidth: 7,
    borderRadius: 10,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    flexDirection: "row",
  },

  profile_content: {
    width: "48%",
    height: "100%",
    backgroundColor: "#f1f1f1",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  item_list: {
    marginTop: 10,
  },

  drawer_sub_menu: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    left: 0,
    width: "100%",
  },

  sub_menu_list: {
    paddingHorizontal: 15,
  },

  sub_menu_content: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    paddingLeft: 15,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginBottom: 5,
    borderRadius: 5,
  },

  sub_menu_push: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 5,
    borderRadius: 5,
  },

  drawer_menu_label: {
    fontSize: 14,
    fontWeight: 400,
    fontFamily: Font.primary,
    letterSpacing: -0.5,
    marginLeft: 10,
    color: "#333",
  },

  stamp_group: {
    justifyContent: "center",
    alignItems: "center",
  },

  stamp_title: {
    width: 80,
    textAlign: "center",
    fontSize: 13,
    letterSpacing: -1,
    justifyContent: "center",
    alignItems: "center",
    color: Colors.dark_grey,
    fontFamily: Font.primary,
    fontWeight: 700,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    borderStyle: "dashed",
  },

  stamp_label: {
    justifyContent: "center",
    color: Colors.grey,
  },

  stamp_bold_label: {
    fontWeight: "bold",
    color: Colors.primary,
    fontSize: 20,
  },

  logo_style: {
    width: 120,
    height: 30,
    resizeMode: "contain",
    marginLeft: 20,
  },
});
export default React.memo(CustomDrawer);
