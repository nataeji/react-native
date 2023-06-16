import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../store/slice/modal";

function UseBackHandler() {
  const dispatch = useDispatch();
  useEffect(() => {
    const backAction = () => {
      const sendData = {
        title: "앱 종료 알림",
        content: "정말로 앱을 종료 하시겠습니까?",
        confirmFn: async () => {
          dispatch(closeModal());
          BackHandler.exitApp();
        },
        cancelFn: () => {
          dispatch(closeModal());
        },
      };
      dispatch(openModal(sendData));
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);
}

export default UseBackHandler;
