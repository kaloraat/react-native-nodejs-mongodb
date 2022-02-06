import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../../screens/Signup";
import Signin from "../../screens/Signin";
import Home from "../../screens/Home";
import { AuthContext } from "../../context/auth";
import HeaderTabs from "../../components/nav/HeaderTabs";
import Account from "../../screens/Account";
import Links from "../../screens/Links";
import ForgotPassword from "../../screens/ForgotPassword";
import PostLink from "../../screens/PostLink";
import LinkView from "../../screens/LinkView";

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
  const [state, setState] = useContext(AuthContext);

  const authenticated = state && state.token !== "" && state.user !== null;

  return (
    <Stack.Navigator
      initialRouteName="Home"
      // screenOptions={{ headerShown: false }}
    >
      {authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Links Daily",
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen name="Links" component={Links} />
          <Stack.Screen
            name="PostLink"
            component={PostLink}
            options={{
              title: "Post",
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="LinkView"
            component={LinkView}
            options={{
              title: "",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
