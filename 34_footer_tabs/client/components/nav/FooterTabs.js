import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";

export default function FooterTabs() {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity>
        <>
          <Text>Home</Text>
        </>
      </TouchableOpacity>
      <TouchableOpacity>
        <>
          <Text>Post</Text>
        </>
      </TouchableOpacity>
      <TouchableOpacity>
        <>
          <Text>Links</Text>
        </>
      </TouchableOpacity>
      <TouchableOpacity>
        <>
          <Text>Account</Text>
        </>
      </TouchableOpacity>
    </View>
  );
}
