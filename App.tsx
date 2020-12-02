import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
  SafeAreaView,
} from "react-native";
import axios from "axios";

//スクリーン画面の高さと幅
const screenHeight = Dimensions.get("screen").height;
const screenwidth = Dimensions.get("screen").width;

//API通信のベースURL
const apiBaseURL = "https://zipcloud.ibsnet.co.jp/api/search";

export default function App() {
  //住所を受け取るフック
  const [zipcode, setZipcode] = useState<string>("");
  const [addresses, setAddresses] = useState([]);

  const update = async () => {
    try {
      const gottenCode = await getaddressInfoAsync(zipcode);
      setAddresses(gottenCode);
    } catch (error) {
      alert(error);
    }
  };

  //住所の情報をとってくる処理
  const getaddressInfoAsync = async (zipcode: string) => {
    const requestConfig = {
      baseURL: apiBaseURL,
      params: { zipcode: zipcode },
    };

    const responce = await axios(requestConfig);
    const datas = responce.data.results;
    console.log(responce);
    return datas;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.postContainer}>
        <TextInput
          style={styles.postText}
          onChangeText={(zipcode) => setZipcode(zipcode)}
          maxLength={7}
        />
        <Pressable style={styles.postBtn} onPress={update}>
          <Text style={styles.btnText}>住所を取得</Text>
        </Pressable>
      </View>

      <View style={styles.text}>
        <Text style={styles.addressText}>{addresses[1]}</Text>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#555555",
    alignItems: "center",
    justifyContent: "center",
  },
  postContainer: {
    flexDirection: "row",
  },
  postText: {
    backgroundColor: "#fff",
    fontSize: 20,
    width: "30%",
    borderWidth: 2,
  },
  postBtn: {
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
  addressText: {},
});
