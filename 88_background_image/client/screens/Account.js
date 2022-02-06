import React, { useState, useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Touchable,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

const Account = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // image
  const [uploadImage, setUploadImage] = useState("");
  const [image, setImage] = useState({ url: "", public_id: "" });
  // context
  const [state, setState] = useContext(AuthContext);

  // console.log("CONTEXT IN ACCOUNT => ", state);

  useEffect(() => {
    if (state) {
      const { name, email, role, image } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
      setImage(image);
    }
  }, [state]);

  const handleSubmit = async () => {
    setLoading(true);
    // api request
    try {
      const { data } = await axios.post("/update-password", { password });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert("👍 Password updated");
        setPassword("");
        setLoading(false);
      }
    } catch (err) {
      alert("Password update failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    // console.log(permissionResult);
    // return;
    if (permissionResult.granted === false) {
      alert("Camera access is required");
      return;
    }
    // get image from image
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    // console.log("PICKER RESULT => ", pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }
    // save to state for preview
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    setUploadImage(base64Image);
    // send to backend for uploading to cloudinary

    const { data } = await axios.post("/upload-image", {
      image: base64Image,
    });
    console.log("UPLOADED RESPONSE => ", data);
    // update async storage
    const as = JSON.parse(await AsyncStorage.getItem("@auth")); // {user: {}, token: ''}
    as.user = data;
    await AsyncStorage.setItem("@auth", JSON.stringify(as));
    // update context
    setState({ ...state, user: data });
    setImage(data.image);
    alert("👍 Profile image saved");
  };

  return (
    <KeyboardAwareScrollView
      contentCotainerStyle={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ marginVertical: 100 }}>
        <CircleLogo>
          {image && image.url ? (
            <Image
              source={{ uri: image.url }}
              style={{
                width: 190,
                height: 190,
                borderRadius: 100,
                marginVertical: 20,
              }}
            />
          ) : uploadImage ? (
            <Image
              source={{ uri: uploadImage }}
              style={{
                width: 190,
                height: 190,
                borderRadius: 100,
                marginVertical: 20,
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => handleUpload()}>
              <FontAwesome5 name="camera" size={25} color="orange" />
            </TouchableOpacity>
          )}
        </CircleLogo>

        {image && image.url ? (
          <TouchableOpacity onPress={() => handleUpload()}>
            <FontAwesome5
              name="camera"
              size={25}
              color="orange"
              style={{ maringTop: -5, marginBottom: 10, alignSelf: "center" }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <Text title center style={{ paddingBottom: 10 }}>
          {name}
        </Text>
        <Text medium center style={{ paddingBottom: 10 }}>
          {email}
        </Text>
        <Text small center light style={{ paddingBottom: 50 }}>
          {role}
        </Text>

        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoComplteType="password"
        />

        <SubmitButton
          title="Update Password"
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Account;
