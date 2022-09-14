import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { isValidEmail, isValidObjField, updateError } from "../utils/methods";

const SignupForm = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const { fullName, email, password, confirmPassword } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // No empty fields
    if (!isValidObjField(userInfo))
      return updateError("All fields required", setError);
    // Name validity
    if (!fullName || fullName.length < 3)
      return updateError("Provide a valid Name", setError);
    // Email validity
    if (!isValidEmail(email)) return updateError("Invalid email!", setError);
    // Check password password lenth. 8 or more characters
    if (!password.trim() || password.length < 8)
      return updateError("Password is less than 8 characters!", setError);
    // Check if password is equal to confirm password
    if (password !== confirmPassword)
      return updateError("Password does not match!", setError);

    return true;
  };
  const submitForm = () => {
    if (isValidForm()) {
      console.log(userInfo);
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
        value={fullName}
        onChangeText={(value) => handleOnChangeText(value, "fullName")}
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
        value={password}
        onChangeText={(value) => handleOnChangeText(value, "password")}
        autoCapitalize="none"
        secureTextEntry
        label="Password"
        placeholder="********"
      />
      <FormInput
        value={confirmPassword}
        onChangeText={(value) => handleOnChangeText(value, "confirmPassword")}
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
