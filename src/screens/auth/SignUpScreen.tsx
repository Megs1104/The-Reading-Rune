import React from "react";
import { View, StyleSheet } from "react-native";
import SignUpForm from "../../components/auth/SignUpForm";

export const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <SignUpForm/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5f8aa4",
  },
});