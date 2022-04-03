import React, { useContext, useEffect, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import AuthContext from "../config/context";
import AppTextInput from "../components/AppTextInput";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { getAsync } from "expo-permissions";

function PassengerDashboard({ navigation }) {
  const [listings, setListings] = useState();
  const [searchText, setSearchText] = useState("");
  const authContext = useContext(AuthContext);
  const [loading, isLoading] = useState(false);
  const [rate, setRate] = useState();
  const [reviewData, setReviewData] = useState([]);
  const [rAvg, setRAvg] = useState();

  let avg = 0;

  async function loadReviewData() {
    avg = 0;
    const postRef = await firebase.firestore().collection("reviews").get();
    setReviewData(
      postRef.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
    );
  }

  async function calAvg(id) {
    let t = 0;
    let n = 0;
    avg = 0;
    reviewData.forEach((item) => {
      if (item.data.owener === id) {
        t = t + item.data.rating;
        n = n + 1;
      }
    });
    avg = t / n;
    console.log(avg);
    return avg;
  }

  const textInput = React.useRef();

  const clearInput = () => (textInput.current.value = "");

  useEffect(() => {
    loaddata();
    loadReviewData();
  }, [searchText]);

  async function loaddata() {
    setListings(null);
    isLoading(true);
    const postRef = await firebase
      .firestore()
      .collection("route")
      .orderBy("date", "asc")
      .get();
    setListings(postRef.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    let data = [];
    // const rateRef= await firebase.firestore().collection('reviews').where('owener' , '===' , listings.data.owner)
    // reatRef.forEach(doc=>{

    // })

    if (searchText !== null || searchText !== "") {
      postRef.forEach((doc) => {
        if (
          String(doc.data().where.label)
            .toLowerCase()
            .startsWith(String(searchText).toLowerCase())
        ) {
          data.push({ id: doc.id, data: doc.data() });
        }
      });
      setListings(data);
      isLoading(false);
      return;
    }
    isLoading(false);
  }

  function clearSearch() {
    setSearchText("");
  }

  return (
    <Screen style={styles.screen}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: -30,
          }}
        >
          <AppTextInput
            defaultValue={searchText}
            ct={true}
            width="80%"
            otherStyle={{ backgroundColor: colors.light }}
            onChangeText={(text) => setSearchText(text)}
            placeholder="Where to go "
          />
          {/* <MaterialCommunityIcons name="check-circle" size={45} color={colors.secondary} onPress={()=>loaddata()}  /> */}
          <MaterialCommunityIcons
            style={{ marginLeft: -10 }}
            name={searchText == "" ? "search-web" : "close-circle"}
            size={30}
            color={colors.primary}
            onPress={() => {
              clearSearch();
            }}
          />
        </View>
        {loading && (
          <Image
            style={styles.loading}
            source={require("../assets/loading.gif")}
          />
        )}
        <FlatList
          data={listings}
          keyExtractor={(listings) => listings.id.toString()}
          renderItem={({ item }) => (
            <Card
              isApproved={item.data.isApproved}
              from={item.data.from.label}
              where={item.data.where.label}
              seats={item.data.seats}
              date={item.data.date.seconds}
              total={item.data.totalEx}
              onPress1={() => navigation.navigate("Driver Profile", item)}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  loading: {
    height: 300,
    width: 300,
    alignSelf: "center",
  },
});

export default PassengerDashboard;
