import { NavigationContainer } from "@react-navigation/native";
import LoginProvider from "./app/context/LoginProvider";
import MainNavigator from "./app/utils/MainNavigator";

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}
