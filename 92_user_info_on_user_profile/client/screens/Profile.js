import React, { useState, useEffect, useContext } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Divider } from "react-native-elements";

dayjs.extend(relativeTime);

const Profile = ({ navigation }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [link, setLink] = useContext(LinkContext);
  // state
  const [userProfile, setUserProfile] = useState({});
  const [userLinks, setUserLinks] = useState([]);

  const route = useRoute();

  useEffect(() => {
    // console.log(route.params);
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`/user-profile/${route.params._id}`);
        // console.log("user profile data => ", data);
        setUserProfile(data.profile);
        setUserLinks(data.links);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/blur.jpeg")}
      style={{ flex: 1, height: "100%" }}
      resizeMode="cover"
      blurRadius={5}
    >
      <Text
        large
        light
        center
        style={{
          color: "#fff",
          paddingTop: 60,
          paddingBottom: 10,
          fontSize: 40,
        }}
      >
        Profile
      </Text>

      <SafeAreaView>
        <View
          style={{
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Image
            source={{
              uri: userProfile?.image?.url
                ? userProfile.image.url
                : `https://via.placeholder.com/500x500.png?text=${userProfile?.name?.charAt(
                    0
                  )}`,
            }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
            }}
          />
          <Text large color="#ccc" style={{ paddingTop: 10 }}>
            {userProfile.name}
          </Text>
          <Text color="#b3b3b3" style={{ paddingTop: 10 }}>
            {userProfile.role}
          </Text>
          <Text tiny color="#b3b3b3" style={{ paddingTop: 10 }}>
            Joined {dayjs(userProfile.createdAt).fromNow()}
          </Text>
        </View>

        <Divider />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text>{JSON.stringify(userProfile, null, 4)}</Text>
          <Text>{JSON.stringify(userLinks, null, 4)}</Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Profile;
