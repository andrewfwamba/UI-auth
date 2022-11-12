import "react-native-gesture-handler";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginandSignup from "../screens/LoginandSignup";
import ImageUpload from "../components/ImageUpload";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "../screens/Profile";
import { useLogin } from "../context/LoginProvider";
import DrawerNavigator from "./DrawerNavigator";
import Loader from "../components/Loader";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={LoginandSignup} name="Loginandsignup" />
      <Stack.Screen component={ImageUpload} name="uploadimage" />
      <Stack.Screen component={Profile} name="profile" />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn, loginPending } = useLogin();
  return isLoggedIn ? (
    <>
      <DrawerNavigator />
      {loginPending ? <Loader /> : null}
    </>
  ) : (
    <StackNavigator />
  );
};

export default MainNavigator;
