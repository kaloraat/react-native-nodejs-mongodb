import React from "react";
import { View, Image } from "react-native";

const CircleLogo = ({ children }) => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 20,
    }}
  >
    <View
      style={{
        backgroundColor: "#fff",
        height: 190,
        width: 190,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children ? (
        children
      ) : (
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 200, height: 200, marginVertical: 20 }}
        />
      )}
    </View>
  </View>
);

export default CircleLogo;
