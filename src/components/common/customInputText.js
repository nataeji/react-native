import React, { forwardRef, useCallback, useEffect, useState } from "react";
import {Platform, StyleSheet, Text, TextInput, View} from "react-native";
import { Controller } from "react-hook-form";
import { Colors } from "../../contants";


const CustomInputText = forwardRef(({
   placeholder,
   name,
   control,
   autoFocus = false,
   secureText = false,
   keyboardType = "default",
   width = { width: "100%" },
   error,
   autoComp = false,
   isDisable = true,}, ref) => {
  const [focused, setFocus] = useState(false);
  const focusHandler = useCallback((focused) => {
    setFocus(focused);
  }, []);

  return (
    <>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={focused ? [styles.focus_input_style, width] : [styles.input_style, width]}
           placeholder={placeholder}
           placeholderTextColor="#aaa"
           fontSize={value ? 18
             : 15}
           autoFocus={autoFocus}
           secureTextEntry={secureText}
           cursorColor={Colors.primary}
           keyboardType={keyboardType}
           onFocus={() => focusHandler(true)}
            onBlur={() => {
             focusHandler(false);
             //onBlur();
           }}
           editable={isDisable}
           onChangeText={onChange}
           value={value}
           textContentType={autoComp ? "oneTimeCode": null}
           autoComplete={autoComp ? "one-time-code": null}
           ref={ref}
        />)
      }
      />
      {error && <Text style={styles.error_msg}>{error}</Text>}
      </>
  );
});

const styles = StyleSheet.create({
  input_style: {
    borderWidth: 1,
    borderColor: "#dadada",
    borderRadius: 7,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
    padding: 10,
    paddingVertical: Platform.OS === 'android' ? 7 : 12,
    fontSize: 14,
    letterSpacing: -0.5,
    color: Colors.primary,
  },

  focus_input_style: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 7,
    backgroundColor: Colors.white,
    marginBottom: 10,
    padding: 10,
    paddingVertical: Platform.OS === 'android' ? 7 : 12,
    fontSize: 14,
    letterSpacing: -0.5,
    color: Colors.primary,
  },

  error_msg :{
    paddingBottom:7,
    fontSize:12.5,
    letterSpacing:-1,
    paddingLeft:5,
    color:Colors.primary,
    opacity:0.8

  }
});

export default  React.memo(CustomInputText);

