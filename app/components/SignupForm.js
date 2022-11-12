import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { isValidEmail, isValidObjField, updateError } from "../utils/methods";

import client from "../api/client";
import axios from "axios";
import { StackActions } from "@react-navigation/native";
import { useLogin } from "../context/LoginProvider";
import { signIn } from "../api/user";

const SignupForm = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState("");
  const { setLoginPending, setProfile } = useLogin();

  const { fullname, email, phone, password, confirmpassword } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // No empty fields
    if (!isValidObjField(userInfo))
      return updateError("All fields required", setError);
    // Name validity
    if (!fullname || fullname.length < 3)
      return updateError("Provide a valid Name", setError);
    // Email validity
    if (!isValidEmail(email)) return updateError("Invalid email!", setError);
    // verify phone
    if (!phone || phone.length < 10)
      return updateError("Provide a valid phone number", setError);
    // Check password password length. 8 or more characters
    if (!password.trim() || password.length < 8)
      return updateError("Password is less than 8 characters!", setError);
    // Check if password is equal to confirm password
    if (password !== confirmpassword)
      return updateError("Password does not match!", setError);

    return true;
  };
  const submitForm = async (value) => {
    if (isValidForm()) {
      try {
        setLoginPending(true);
        const res = await client.post("/create-user", {
          ...userInfo,
        });
        console.log(res.data);
        if (res.data.success) {
          const signInRes = await signIn(userInfo.email, userInfo.password);

          if (signInRes.data.success) {
            navigation.dispatch(
              StackActions.replace("uploadimage", {
                token: signInRes.data.token,
                data: signInRes.data,
              })
            );
            setProfile(signInRes.data.userInfo);
          }
          setLoginPending(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={fullname}
        onChangeText={(value) => handleOnChangeText(value, "fullname")}
        label="Full Name"
        placeholder="Full Name"
      />
      <FormInput
        value={email}
        onChangeText={(value) => handleOnChangeText(value, "email")}
        autoCapitalize="none"
        label="Email"
        placeholder="example@email.com"
      />

      <FormInput
        value={phone}
        onChangeText={(value) => handleOnChangeText(value, "phone")}
        autoCapitalize="none"
        label="Phone"
        placeholder="phone"
      />

      <FormInput
        value={password}
        onChangeText={(value) => handleOnChangeText(value, "password")}
        autoCapitalize="none"
        secureTextEntry
        label="Password"
        placeholder="********"
      />
      <FormInput
        value={confirmpassword}
        onChangeText={(value) => handleOnChangeText(value, "confirmpassword")}
        autoCapitalize="none"
        secureTextEntry
        label="Confirm Password"
        placeholder="********"
      />

      <FormSubmitButton onPress={submitForm} title="Sign Up" />
    </FormContainer>
  );
};

export default SignupForm;

const styles = StyleSheet.create({});
