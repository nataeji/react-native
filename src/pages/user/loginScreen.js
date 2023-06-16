import React from 'react';
import LoginForm from "../../components/user/loginForm";

function LoginScreen(){
  return (
    <LoginForm />
  );
}

export default React.memo(LoginScreen);
