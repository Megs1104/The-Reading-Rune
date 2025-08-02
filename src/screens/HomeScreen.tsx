import React from "react";
import { Pressable, View } from "react-native";
import { CustomText } from "../components/CustomText";
import { StyleSheet } from "react-native";

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <CustomText style={styles.buttonText}>Add a Book</CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    alignItems: "center",
    backgroundColor: "#5f8aa4",
  },
  button: {
    borderRadius: 100,
    backgroundColor: "#2d1d46",
    padding: 8,
    margin: 8,
  },
  buttonText: {
    color: "#f5ddba",
    fontSize: 15,
  },
});
