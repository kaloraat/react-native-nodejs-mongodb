import React, { useState, useEffect, useContext } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import axios from "axios";

const Profile = ({ navigation }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [link, setLink] = useContext(LinkContext);
  // state
  const [userProfile, setUserProfile] = useState({});

  const route = useRoute();

  useEffect(() => {
    console.log(route.params);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/blur.jpeg")}
      style={{ flex: 1, height: "100%" }}
      resizeMode="cover"
      blurRadius={1}
    >
      <Text
        large
        light
        center
        style={{ color: "#fff", paddingTop: 60, paddingBottom: 10 }}
      >
        Profile
      </Text>

      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text>{JSON.stringify(userProfile, null, 4)}</Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Profile;
