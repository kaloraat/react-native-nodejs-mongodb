import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Welcome from "./components/Welcome";
import { WebView } from "react-native-webview";

export default function App() {
  const names = ["Ryan", "Zen", "David"];

  return (
    <WebView style={{}} source={{ uri: "https://codecontinue.com" }} />
    // <View style={styles.container}>
    //   <StatusBar style="auto" />

    //   {names.map((name) => (
    //     <Welcome key={name} name={name} />
    //   ))}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
