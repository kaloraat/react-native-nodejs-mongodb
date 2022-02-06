import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";
import { LinkContext } from "../context/link";
import axios from "axios";
import PreviewCard from "../components/links/PreviewCard";
import SubmitButton from "../components/auth/SubmitButton";
import Search from "../components/links/Search";

const Home = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);
  const [page, setPage] = useState(1);
  const [linksCount, setLinksCount] = useState(0);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchLinks();
  }, [page]);

  const fetchLinks = async () => {
    const { data } = await axios.get(`/links/${page}`);
    setLinks([...links, ...data]);
  };

  useEffect(() => {
    const linksCount = async () => {
      const { data } = await axios.get(`/links-count`);
      setLinksCount(data);
    };
    linksCount();
  }, []);

  const handlePress = async (link) => {
    await axios.put(`/view-count/${link._id}`);
    navigation.navigate("LinkView", { link });
    // update link in the context
    setLinks(() => {
      const index = links.findIndex((l) => l._id === link._id);
      links[index] = { ...link, views: link.views + 1 };
      return [...links];
    });
  };

  const searched = (keyword) => (item) => {
    return item.urlPreview.ogTitle
      .toLowerCase()
      .includes(keyword.toLowerCase());
  };

  return (
    <>
      <Search value={keyword} setValue={setKeyword} />
      <SafeAreaView style={{ flex: 1 }}>
        <Text title center light style={{ paddingTop: 10, paddingBottom: 10 }}>
          Recent Links
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {links &&
            links.filter(searched(keyword)).map((link) => (
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
                  showIcons={true}
                />
              </View>
            ))}

          {linksCount > links?.length && (
            <SubmitButton
              title="Load more"
              handleSubmit={() => setPage(page + 1)}
            />
          )}
        </ScrollView>

        <FooterTabs />
      </SafeAreaView>
    </>
  );
};

export default Home;
