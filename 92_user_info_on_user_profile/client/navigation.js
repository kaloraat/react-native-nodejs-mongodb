import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/auth";
import ScreensNav from "./components/nav/ScreensNav";
import { LinkProvider } from "./context/link";

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <LinkProvider>
          <ScreensNav />
        </LinkProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
