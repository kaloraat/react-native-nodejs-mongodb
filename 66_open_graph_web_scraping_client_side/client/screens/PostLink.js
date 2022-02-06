import React, { useState } from "react";
import { SafeAreaView, ScrollView, TextInput, View } from "react-native";
import FooterTabs from "../components/nav/FooterTabs";
import Text from "@kaloraat/react-native-text";
import SubmitButton from "../components/auth/SubmitButton";
import ogs from "@uehreka/open-graph-scraper-react-native";

const PostLink = () => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async (text) => {
    try {
      setLoading(true);
      setLink(text);

      ogs({ url: text }, (error, results, response) => {
        console.log(error);
        console.log(results);
        console.log(response);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    console.log("title and link => ", title, link);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text light center style={{ paddingTop: 30 }}>
          PASTE WEBSITE URL
        </Text>

        <TextInput
          value={link}
          onChangeText={(text) => handleChange(text)}
          placeholder="Paste the url"
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            borderWidth: 1,
            borderColor: "grey",
            height: 50,
            marginVertical: 30,
            marginHorizontal: 15,
            borderRadius: 30,
            padding: 15,
          }}
        />

        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Give it a title"
          autoCapitalize="sentences"
          style={{
            borderWidth: 1,
            borderColor: "grey",
            height: 50,
            marginVertical: 10,
            marginHorizontal: 15,
            borderRadius: 30,
            padding: 15,
          }}
        />

        <View style={{ paddingTop: 25 }}>
          <SubmitButton
            title="Submit"
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </View>
      </ScrollView>

      <FooterTabs />
    </SafeAreaView>
  );
};

export default PostLink;
