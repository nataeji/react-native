import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback, Animated, Easing, TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/slice/modal";
import { Colors, Font } from "../../contants";

function CustomerModal() {
  const dispatch = useDispatch();
  const { visible, title, content, contentType, confirmFn, cancelFn } = useSelector(state => state.modal);
  const modalAnimation = useRef(new Animated.Value(0)).current;

  const scale = modalAnimation.interpolate({
    // Value의 값이 0일때는 0, 1일때는 150
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const animationStart = useCallback(() => {
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const animationEnd = useCallback(() => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeModalHandler = useCallback(() => {
    dispatch(closeModal());
  }, []);

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
              <Ionicons name="ios-chatbox-outline" size={20} />
              <Text style={styles.title_label}>{title}</Text>
            </View>
            <View style={styles.modal_content}>
              <Text style={styles.modal_content_label}>{content}</Text>
            </View>
            <View style={styles.btn_group}>
              {
                confirmFn !== null &&
                <TouchableOpacity onPress={confirmFn}>
                  <View style={styles.confirm_btn}>
                    <Text style={styles.btn_label}>확인</Text>
                  </View>
                </TouchableOpacity>
              }
              {
                cancelFn !== null &&
                <TouchableOpacity onPress={cancelFn}>
                  <View style={styles.cancel_btn}>
                    <Text style={styles.btn_label}>취소</Text>
                  </View>
                </TouchableOpacity>
              }

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
    justifyContent: "center",
    alignItems: "center",
  },

  modal_content_label: {
    letterSpacing: -0.5,
    fontSize: 14,
    color: Colors.dark_grey,
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
});
export default React.memo(CustomerModal);
