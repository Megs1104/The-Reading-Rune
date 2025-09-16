import React from "react";
import { Pressable, View } from "react-native";
import { CustomText } from "../components/CustomText";
import { StyleSheet } from "react-native";
import Greeting from "../components/home/Greeting";
import ListCard from "../components/home/ListCard";
import ScanButton from "../components/home/ScanButton";

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Greeting/>
      <ScanButton/>
      <ListCard listName={"wishlist"}/>
      <ListCard listName={"tbr"}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5f8aa4",
  },
});
