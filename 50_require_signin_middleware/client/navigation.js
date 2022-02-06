import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/auth";
import ScreensNav from "./components/nav/ScreensNav";

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ScreensNav />
      </AuthProvider>
    </NavigationContainer>
  );
}
