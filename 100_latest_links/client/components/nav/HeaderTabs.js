import React, { useContext } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../../context/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const HeaderTabs = () => {
  const [state, setState] = useContext(AuthContext);
  // hooks
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate("TrendingLinks")}>
        <FontAwesome5 name="bell" size={25} color="#ff9900" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HeaderTabs;
