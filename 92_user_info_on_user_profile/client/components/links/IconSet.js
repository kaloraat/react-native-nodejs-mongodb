import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "@kaloraat/react-native-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#333",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    // android
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});

const IconSet = ({
  handleLikePress,
  handleUnLikePress,
  showIcons,
  link,
  auth,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        top: -180,
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: 20,
        marginLeft: 20,
      }}
    >
      {showIcons && (
        <>
          {link?.likes?.includes(auth?.user?._id) ? (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => handleUnLikePress(link)}
            >
              <FontAwesome5
                name="heartbeat"
                size={25}
                color="#ff9900"
                style={styles.shadow}
              />
              <Text center color="#ff9900">
                {link.likes.length}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => handleLikePress(link)}
            >
              <FontAwesome5
                name="heart"
                size={25}
                color="#ff9900"
                style={styles.shadow}
              />
              <Text center color="#ff9900">
                {link.likes.length}
              </Text>
            </TouchableOpacity>
          )}

          <View style={{ alignItems: "center" }}>
            <FontAwesome5
              name="eye"
              size={25}
              color="#ff9900"
              style={styles.shadow}
            />
            <Text center color="#ff9900">
              {link.views}
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <FontAwesome5
              name="clock"
              size={25}
              color="#ff9900"
              style={styles.shadow}
            />
            <Text center color="#ff9900">
              {dayjs(link.createdAt).format("DD/MM/YY")}
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <FontAwesome5
              onPress={() =>
                navigation.navigate("Profile", {
                  name: link.postedBy?.name,
                  _id: link.postedBy?._id,
                })
              }
              name="user"
              size={25}
              color="#ff9900"
              style={styles.shadow}
            />
            <Text center color="#ff9900">
              {link.postedBy?.name}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default IconSet;
