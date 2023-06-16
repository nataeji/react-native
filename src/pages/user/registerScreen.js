import React from 'react';
import { Text, View } from "react-native";
import RegisterForm from "../../components/user/registerForm";

function RegisterScreen(){
  return (
    <RegisterForm />
  );
}

export default React.memo(RegisterScreen);
