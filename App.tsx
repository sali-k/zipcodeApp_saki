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
  FlatList,
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
  const [addresses, setAddresses] = useState<any[]>([]);
  //Loading
  const [loading, setLoading] = useState(false);

  const update = async () => {
    //Loading(中)
    setLoading(true);

    try {
      const gottenCode = await getaddressInfoAsync(zipcode);
      setAddresses(gottenCode);
    } catch (error) {
      alert(error);
    }

    //Loading(完)
    setLoading(false);
  };

  //住所の情報をとってくる処理
  const getaddressInfoAsync = async (zipcode: string) => {
    const requestConfig = {
      baseURL: apiBaseURL,
      params: { zipcode: zipcode },
    };

    const responce = await axios(requestConfig);
    const datas = responce.data.results;
    // console.log(responce);
    return datas;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.postContainer}>
        <TextInput
          style={styles.postText}
          onChangeText={(zipcode) => setZipcode(zipcode)}
          maxLength={7}
          keyboardType="numeric"
          placeholder="郵便番号を入力"
        />
        <Pressable style={styles.postBtn} onPress={update}>
          <Text style={styles.btnText}>住所を取得</Text>
        </Pressable>
      </View>

      <View style={styles.text}>
        {loading ? (
          <Text style={styles.loadingText}>検索中です…</Text>
        ) : (
          //{item}には、addressesの配列の要素が入っているので、必要な物だけを選択して表示
          <FlatList
            data={addresses}
            renderItem={({ item }) => (
              <Text style={styles.addressText}>
                {item.address1}
                {item.address2}
                {item.address3}
              </Text>
            )}
            // 今回はidのようなユニークを持っていないので、indexを使ってkeyを指定。string形式なのでtoStringで指定。
            keyExtractor={(item, index) => index.toString()}
          />
        )}
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
    padding: "5%",
  },
  postText: {
    backgroundColor: "#fff",
    fontSize: 20,
    width: "50%",
    borderWidth: 2,
    marginRight: "5%",
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
  loadingText: {
    fontSize: 25,
  },
  addressText: {
    fontSize: 25,
  },
});
