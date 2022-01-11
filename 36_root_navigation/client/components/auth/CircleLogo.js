import React from "react";
import { View, Image } from "react-native";

const CircleLogo = () => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      source={require("../../assets/logo.png")}
      style={{ width: 200, height: 200, marginVertical: 20 }}
    />
  </View>
);

export default CircleLogo;
