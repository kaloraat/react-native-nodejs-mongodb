import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-elements";

export const Tab = ({ name, text, handlePress }) => (
  <TouchableOpacity>
    <>
      <FontAwesome5
        name={name}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
        onPress={handlePress}
      />
      <Text>{text}</Text>
    </>
  </TouchableOpacity>
);

export default function FooterTabs() {
  const navigation = useNavigation();

  return (
    <>
      <Divider width={1} />
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          marginHorizontal: 30,
          justifyContent: "space-between",
        }}
      >
        <Tab
          text="Home"
          name="home"
          handlePress={() => navigation.navigate("Home")}
        />
        <Tab
          text="Post"
          name="plus-square"
          handlePress={() => navigation.navigate("Post")}
        />
        <Tab
          text="Links"
          name="list-ol"
          handlePress={() => navigation.navigate("Links")}
        />
        <Tab
          text="Account"
          name="user"
          handlePress={() => navigation.navigate("Account")}
        />
      </View>
    </>
  );
}
