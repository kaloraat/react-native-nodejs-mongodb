import React, { useContext, useEffect } from "react";
import { SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";
import { LinkContext } from "../context/link";
import axios from "axios";
import PreviewCard from "../components/links/PreviewCard";

const Home = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const { data } = await axios.get("/links");
    setLinks(data);
  };

  const handlePress = (link) => {
    navigation.navigate("LinkView", { link });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text title center light style={{ paddingTop: 10, paddingBottom: 10 }}>
        Recent Links
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {links &&
          links.map((link) => (
            <View
              key={link._id}
              style={{
                alignItems: "center",
              }}
            >
              <PreviewCard
                {...link.urlPreview}
                handlePress={handlePress}
                link={link}
              />
            </View>
          ))}
      </ScrollView>

      <FooterTabs />
    </SafeAreaView>
  );
};

export default Home;
