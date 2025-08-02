import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";

export const CustomText = ({ children, style, ...props }: any) => {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  useEffect(() => {
    Font.loadAsync({
      "Lora-Regular": require("../../assets/fonts/Lora-VariableFont_wght.ttf"),
    }).then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: { fontFamily: "Lora-Regular" },
});
