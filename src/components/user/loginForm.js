import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInputText from "../common/customInputText";
import validation from "../../validate/validation";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Routes } from "../../contants";
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/native";
import EncryptedStorage from "react-native-encrypted-storage";
import { useDispatch, useSelector } from "react-redux";
import { loginProc } from "../../store/slice/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import { closeModal, openModal } from "../../store/slice/modal";
import Loading from "../common/loading";

const scheme = validation.login;

function LoginForm() {
  const {loading, user, error} = useSelector(state => state.auth.login);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [serviceCheck, setServiceCheck] = useState(false);
  const { control, handleSubmit, getValues, setValue, setError, formState: { errors } } = useForm({
    resolver: yupResolver(scheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //회원가입 페이지 이동.
  const goRegisterHandler = useCallback((data) => {
    navigation.navigate(Routes.REGISTER);
  }, []);

  //해당 데이터를 submit한다.
  const submitHandler = useCallback(async (data) => {
    console.log("login submit :", data);
    //Remember me가 선택되어 있으면 localStorage에 저장.
    if(serviceCheck){
      await EncryptedStorage.setItem("email", data.email);
    }else{
      await EncryptedStorage.setItem("email", "");
    }
    try{
      const result = await dispatch(loginProc(data))
      const resultData = unwrapResult(result);
      console.log("resultData : ", resultData);
      //성공시 화면이동.
      //navigation.navigte(Routes.DRAWER)
    }catch(error){
      //에러가 발생하였을때 처리
      console.log("resultData : ", error);
      const modalData = {
        title:"회원로그인 알림",
        content: `회원로그인이 안되었습니다.\n다시시도해 주세요.`,
        confirmFn : async () => {
          dispatch(closeModal());
        },
        cancelFn: null,
      };
      dispatch(openModal(modalData));
    }
  }, [serviceCheck]);

  //Rememberme 클릭시 상태변경.
  const remembermeHandler = useCallback(async () => {
    console.log("remember me : ", serviceCheck);
    setServiceCheck(!serviceCheck);
  }, [serviceCheck]);

  //로딩시 저장되어 있으면 이메일 세팅
  const getEmailHandler = useCallback(async () => {
    const localEmail = await EncryptedStorage.getItem("email");
    console.log("getEmail : ");
    setValue("email", localEmail);
    if(localEmail !== ""){
      setServiceCheck(true);
    }
  }, []);

  useEffect(() => {
    getEmailHandler();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loading />}
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
      >
        <View style={styles.main_text_label_grp}>
          <Text style={styles.main_text_label}>Freelancer Team </Text>
          <Text style={styles.main_text_label_color}>Navigator</Text>
        </View>
        <View style={styles.main_text}>
          <Text style={styles.welcome_label}>Welcome to freelancer team navigator</Text>
        </View>
        <View style={styles.main_icon_grp}>
          <View style={styles.main_icon}>
            <Ionicons name="lock-closed-outline" size={65} color={Colors.primary} />
          </View>
        </View>
        <View style={styles.label_line}>
          <Ionicons name="mail-outline" size={18} style={styles.label_icon} /><Text>이메일을 입력해 주세요.</Text>
        </View>
        <View style={styles.input_line}>
          <CustomInputText
            placeholder="Enter email address"
            autoFocus={true}
            secureText={false}
            name="email"
            control={control}
            keyboardType="default"
            error={errors.email?.message}
          />
        </View>
        <View style={styles.label_line}>
          <Ionicons name="lock-open-outline" size={18} style={styles.label_icon} /><Text>비밀번호를 입력해 주세요.</Text>
        </View>
        <View>
          <CustomInputText
            placeholder="Enter password"
            autoFocus={false}
            secureText={true}
            name="password"
            control={control}
            keyboardType="default"
            error={errors.password?.message}
          />
        </View>
        <View style={styles.remember_me}>
          <CheckBox
            value={serviceCheck}
            boxType="square"
            onFillColor={Colors.primary}
            onTintColor="#df2e38"
            onCheckColor="#fff"
            style={styles.checkbox_input}
            tintColors={{ true: Colors.primary, false: Colors.grey }}
            onValueChange={remembermeHandler}
          />
          <Text>Remember me</Text>
        </View>
        <TouchableOpacity onPress={handleSubmit(submitHandler)}>
          <View style={styles.primary_button}>
            <Text style={styles.button_label}>회원로그인</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.info_line}>
          <Text>아직도 회원이 아니십니까?</Text>
          <Text style={styles.label_bold} onPress={goRegisterHandler}>회원가입</Text>
        </View>
        {/*<View style={styles.info_line}>*/}
        {/*  <Text>비밀번호를 잊어버리셨습니까?</Text>*/}
        {/*  <Text style={styles.label_bold}>비밀번호 찾기</Text>*/}
        {/*</View>*/}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  main_text_label_grp: {
    flexDirection: "column",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  main_text_label: {
    fontSize: 28,
    color: "#222",
    letterSpacing: -1,
    fontWeight: "bold",
  },
  main_text: {
    justifyContent: "center",
    alignItems: "center",
  },

  main_text_label_color: {
    fontSize: 45,
    color: Colors.primary,
    fontWeight: "bold",
    lineHeight: 45,
    letterSpacing: 0,
    marginBottom: 7,
  },

  main_icon_grp: {
    justifyContent: "center",
    alignItems: "center",
  },
  label_icon: {
    marginRight: 5,
  },
  main_icon: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: Colors.primary,
    width: 110,
    height: 110,
  },

  welcome_label: {
    fontSize: 16,
    color: "#aaa",
    letterSpacing: -0.5,
  },
  label_line: {
    paddingBottom: 5,
    flexDirection: "row",
  },
  input_line: { marginBottom: 10 },
  primary_button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  button_label: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 600,
  },
  remember_me: {
    flexDirection: "row",
    marginBottom: 15,
  },
  checkbox_input: {
    marginRight: 10,
    width: 22,
    height: 22,
  },
  info_line: {
    flexDirection: "row",
    paddingVertical: 3,
  },
  label_bold: {
    fontWeight: 600,
    marginLeft: 5,
    color: Colors.primary,
  },
});
export default React.memo(LoginForm);
