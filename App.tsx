import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";

export default function App() {
  const [value, setValue] = React.useState("");
  const search = () => {};
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue(text)}
        value={value}
      />
      <Pressable
        style={styles.btn}
        onPress={(search) => {
          search;
        }}
      >
        {/* <Pressable style={styles.btn} onPress={() => {}}> */}
        <Text style={styles.btnText}>住所を取得</Text>
      </Pressable>
      <StatusBar style="auto" />
      <Text style={styles.text}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#555555",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    width: 100,
    height: 30,
    borderWidth: 2,
  },
  btn: {
    borderRadius: 7,
    width: 100,
    height: 30,
    backgroundColor: "#7B68EE",
    borderWidth: 2,
  },
  btnText: {
    padding: "5%",
    textAlign: "center",
    fontSize: 18,
  },
  text: {
    backgroundColor: "#fff",
    width: "80%",
    height: "50%",
    borderWidth: 2,
  },
});
