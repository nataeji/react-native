import React, { useCallback } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInputText from "../common/customInputText";
import validation from "../../validate/validation";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Routes } from "../../contants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { registerProc } from "../../store/slice/auth";
import Loading from "../common/loading";
import { unwrapResult } from "@reduxjs/toolkit";
import { closeModal, openModal } from "../../store/slice/modal";

const scheme = validation.register;

function RegisterForm() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.auth.register);
  const { control, handleSubmit, getValues, setValue, setError, formState: { errors } } = useForm({
    resolver: yupResolver(scheme),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const goLoginHandler = useCallback((data) => {
    navigation.navigate(Routes.LOGIN);
  }, []);

  const submitHandler = useCallback(async (data) => {
    console.log("submit : ", data);
    try{
      const result = await dispatch(registerProc(data));
      const resultData = unwrapResult(result);
      console.log('resultData : ', resultData);
      //정상적으로 회원가입이 된 경우 로그인 페이지로 이동한다.
      const modalData = {
        title:"회원가입 알림",
        content: `회원가입이 정상적으로 이루어졌습니다.\n로그인페이지로 이동합니다.`,
        confirmFn : async () => {
          dispatch(closeModal());
          navigation.navigate(Routes.LOGIN);
        },
        cancelFn: () => {
          dispatch(closeModal());
        },
      };
      dispatch(openModal(modalData));
    }catch(error){
      //회원가입 도중 에러가 발생한 경우.
    }

  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {loading && <Loading />}
        <View style={styles.main_text_label_grp}>
          <Text style={styles.main_text_label}>Freelancer Team </Text>
          <Text style={styles.main_text_label_color}>Navigator</Text>
        </View>
        <View style={styles.main_text}>
          <Text style={styles.welcome_label}>Welcome to freelancer team navigator</Text>
        </View>
        <View style={styles.main_icon_grp}>
          <View style={styles.main_icon}>
            <Ionicons name="person-outline" size={65} color={Colors.primary}/>
          </View>
        </View>
        <View style={styles.label_line}>
          <Ionicons name="mail-outline" size={18} style={styles.label_icon}/><Text>이메일을 입력해 주세요.</Text>
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
          <Ionicons name="person-outline" size={18} style={styles.label_icon}/><Text>회원이름을 입력해 주세요.</Text>
        </View>
        <View style={styles.input_line}>
          <CustomInputText
            placeholder="Enter username"
            autoFocus={false}
            secureText={false}
            name="username"
            control={control}
            keyboardType="default"
            error={errors.username?.message}
          />
        </View>
        <View style={styles.label_line}>
          <Ionicons name="lock-open-outline" size={18} style={styles.label_icon}/><Text>비밀번호를 입력해 주세요.</Text>
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

        <TouchableOpacity onPress={handleSubmit(submitHandler)}>
          <View style={styles.primary_button}>
            <Text style={styles.button_label}>회원가입</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.info_line}>
          <Text>현재 회원이십니까?</Text>
          <Text style={styles.label_bold} onPress={goLoginHandler}>회원로그인</Text>
        </View>
        {/*<View style={styles.info_line}>*/}
        {/*  <Text>비밀번호를 잊어버리셨습니까?</Text>*/}
        {/*  <Text  style={styles.label_bold}>비밀번호 찾기</Text>*/}
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
    justifyContent:'center',
    alignItems:'center',
  },
  main_text_label: {
    fontSize: 28,
    color: "#222",
    letterSpacing: -1,
    fontWeight: "bold",
  },
  main_text: {
    justifyContent:'center',
    alignItems:'center',
  },

  main_text_label_color: {
    fontSize: 45,
    color: Colors.primary,
    fontWeight: "bold",
    lineHeight: 45,
    letterSpacing: 0,
    marginBottom: 7,
  },

  main_icon_grp:{
    justifyContent:'center',
    alignItems:'center',
  },
  label_icon:{
    marginRight:5,
  },
  main_icon:{
    justifyContent:'center',
    alignItems:'center',
    margin:20,
    borderRadius: 100,
    borderWidth:6,
    borderColor:Colors.primary,
    width:110,
    height:110,
  },

  welcome_label: {
    fontSize: 16,
    color: "#aaa",
    letterSpacing:-0.5,
  },
  label_line: {
    paddingBottom: 5,
    flexDirection:'row',
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
  remember_me:{
    flexDirection:'row',
    marginBottom:15,
  },
  checkbox_input: {
    marginRight: 10,
    width: 22,
    height: 22,
  },
  info_line:{
    flexDirection:'row',
    paddingVertical:3,
  },
  label_bold:{
    fontWeight:600,
    marginLeft:5,
    color:Colors.primary,
  }
});
export default React.memo(RegisterForm);
