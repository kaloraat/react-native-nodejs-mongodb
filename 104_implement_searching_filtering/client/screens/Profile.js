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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

dayjs.extend(relativeTime);

const Profile = ({ navigation }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);
  // state
  const [userProfile, setUserProfile] = useState({});
  const [userLinks, setUserLinks] = useState([]);

  const route = useRoute();
  const routeParamsId = route?.params?._id;

  useEffect(() => {
    // console.log(route.params);
    const fetchUserProfile = async (userId) => {
      try {
        const { data } = await axios.get(`/user-profile/${userId}`);
        // console.log("user profile data => ", data);
        setUserProfile(data.profile);
        setUserLinks(data.links);
      } catch (err) {
        console.log(err);
      }
    };
    routeParamsId
      ? fetchUserProfile(routeParamsId)
      : fetchUserProfile(auth.user._id);
  }, []);

  const handleDelete = async (linkId) => {
    // console.log("delete", linkId);
    try {
      const { data } = await axios.delete(`/link-delete/${linkId}`);
      // console.log("data", data);
      // update userLinks
      setUserLinks((links) => {
        const index = userLinks.findIndex((l) => l._id === linkId);
        userLinks.splice(index, 1);
        return [...links];
      });
      // update context
      setLinks((links) => {
        const index = links.findIndex((l) => l._id === linkId);
        links.splice(index, 1);
        return [...links];
      });
      alert("🐸 Deleted successfully!");
    } catch (err) {
      console.log(err);
      alert("🐸 Delete failed");
    }
  };

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
        <View style={{ paddingBottom: 20 }}></View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text bold medium center color="#b3b3b3">
            {userLinks.length} Links
          </Text>

          {userLinks.map((link) => (
            <View
              key={link._id}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text color="#ccc">{link?.urlPreview?.ogTitle}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text color="#ccc">{link?.views} Views</Text>
                {auth?.user?._id === link?.postedBy._id && (
                  <TouchableOpacity onPress={() => handleDelete(link._id)}>
                    <FontAwesome5 name="trash" color="#ff9900" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Profile;
