import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";

const PreviewCard = ({
  ogTitle = "Untitled",
  ogDescription = "No description found...",
  ogImage = "https://via.placeholder.com/500x500.png?text=Image",
  handlePress = (f) => f,
  link = {},
}) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: "92%",
        height: 280,
        borderRadius: "14px",
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 20,
      }}
    >
      <Image
        style={{
          height: "70%",
          width: "100%",
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        source={{ uri: ogImage.url }}
      />

      <TouchableOpacity onPress={() => handlePress(link)}>
        <View style={{ padding: 5, height: 50 }}>
          <Text medium style={{ paddingTop: 5, paddingBottom: 5 }}>
            {ogTitle}
          </Text>
          <Text semi>{ogDescription}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PreviewCard;
