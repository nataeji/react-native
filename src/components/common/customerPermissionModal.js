import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback, Animated, Easing, TouchableOpacity, Alert, Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { closeModal } from "../../store/slice/modal";
import { Colors, Font } from "../../contants";

function CustomerPermissionModal() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [locationPermission, setLocationPermission] = useState("");

  useEffect(() => {
    const getAppPermission = async () => {
      const locationResult = Platform.OS === 'android' ? await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION) : Platform.OS === 'ios' && await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
      console.log("locationResult : ", locationResult)
      if (locationResult === RESULTS.GRANTED) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLocationPermission(locationResult);
    };
    getAppPermission();
  }, [locationPermission]);

  const modalAnimation = useRef(new Animated.Value(0)).current;

  const scale = modalAnimation.interpolate({
    // Value의 값이 0일때는 0, 1일때는 150
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const animationStart = useCallback(() => {
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const animationEnd = useCallback(() => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeModalHandler = useCallback(() => {
    dispatch(closeModal());
  }, []);

  const reLocationPermission = useCallback(async () => {
    const result = Platform.OS === 'android' ? await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION) : Platform.OS === 'ios' && await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
    setLocationPermission(result);
  }, []);

  const confirmHandler = useCallback(async () => {
    //setVisible(false);
    console.log("confirmHandler #########################")
    if (Platform.OS === "android") {
      if (locationPermission !== RESULTS.GRANTED) {
        try {
          const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          if (result === RESULTS.GRANTED) {
            setLocationPermission(RESULTS.GRANTED);
            dispatch(setLocationPermission(RESULTS.GRANTED));
          }
          if (result === RESULTS.DENIED) {
            Alert.alert(
              "이 앱은 위치권한 허용이 필요합니다.",
              "위치권한을 허용하시겠습니까?",
              [
                {
                  text: "네",
                  onPress: () => reLocationPermission(),
                },
                {
                  text: "아니오",
                  style: "cancel",
                },
              ],
            );
          }
        } catch (error) {
          console.log("askPermission", error);
        }
      }
    }else if(Platform.OS === "ios"){
      if (locationPermission !== RESULTS.GRANTED) {
        try {
          const result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
          if (result === RESULTS.GRANTED) {
            setLocationPermission(RESULTS.GRANTED);
            dispatch(setLocationPermission(RESULTS.GRANTED));
          }
          if (result === RESULTS.DENIED) {
            Alert.alert(
              "이 앱은 위치권한 허용이 필요합니다.",
              "위치권한을 허용하시겠습니까?",
              [
                {
                  text: "네",
                  onPress: () => reLocationPermission(),
                },
                {
                  text: "아니오",
                  style: "cancel",
                },
              ],
            );
          }
        } catch (error) {
          console.log("askPermission", error);
        }
      }
    }
  }, [locationPermission]);

  useEffect(() => {
    if (visible) {
      animationStart();
    } else {
      animationEnd();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <Pressable style={styles.backdrop_btn} onPress={closeModalHandler}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.modal_container, { opacity: scale, transform: [{ scale }] }]}>
            <View style={styles.modal_title}>
              <Ionicons name="md-notifications-outline" size={20} color="#333" />
              <Text style={styles.title_label}>권한설정</Text>
            </View>
            <View style={styles.modal_content}>
              <Text style={styles.modal_content_label}>
                {"앱을 이용하기 위하여 \n다음 권한을 허용해 주시기 바랍니다."}
              </Text>
              <View style={styles.permission_box}>
                <View style={styles.permission_list}>
                  <View style={styles.permission_circle}>
                    <Ionicons name="md-location-outline" size={17} color="#fff" />
                  </View>
                  <Text style={styles.permission_label}>위치찾기 권한이 필요합니다.</Text>
                </View>
              </View>
            </View>
            <View style={styles.btn_group}>
              <TouchableOpacity onPress={confirmHandler}>
                <View style={styles.confirm_btn}>
                  <Text style={styles.btn_label}>확인</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop_btn: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modal_container: {
    backgroundColor: Colors.white,
    width: "80%",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    opacity: 0,
    borderColor: Colors.light_grey,
    shadowColor: "#555",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },

  modal_content: {
    paddingVertical: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  modal_content_label: {
    letterSpacing: -0.7,
    fontSize: 14,
    color: Colors.black,
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    width: "100%",
    fontWeight: 700,
  },

  permission_list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: 5,
    paddingHorizontal: 10,
  },

  permission_box: {
    backgroundColor: "#efefef",
    width: "100%",
    paddingVertical: 8,
    borderRadius: 10,

  },

  modal_title: {
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    flexDirection: "row",
  },

  title_label: {
    fontFamily: Font.primary,
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: -0.5,
    marginLeft: 5,
    color: Colors.black,
  },

  btn_group: {
    borderTopWidth: 1,
    borderTopColor: "#efefef",
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  confirm_btn: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginHorizontal: 3,
  },

  cancel_btn: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: Colors.grey,
    borderRadius: 5,
    marginHorizontal: 3,
  },

  btn_label: {
    color: Colors.white,
    fontFamily: Font.primary,
    fontSize: 13,
    fontWeight: 700,
  },

  permission_label: {
    fontSize: 13,
    letterSpacing: -0.5,
    marginLeft: 10,
    paddingVertical: 5,
    color: "#333",
  },

  permission_circle: {
    backgroundColor: Colors.primary,
    borderRadius: 60,
    padding: 5,
  },
});
export default React.memo(CustomerPermissionModal);
