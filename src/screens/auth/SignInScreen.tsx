import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  ActivityIndicator,
  Pressable,
  TextInput,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CustomText } from "../../components/CustomText";
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/types";
import SignInForm from "../../components/SignInForm";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>
type SignInInput = {
  email: string;
  password: string;
  navigation: NavigationProp;
};

export const SignInScreen = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <CustomText>Welcome to</CustomText>
      <Image
        source={{
          uri: "https://nzziroohrdngtpurdfxm.supabase.co/storage/v1/object/sign/logos/FullLogo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZGY3Nzk5OC03NWU4LTRmZmEtOGY1My0xZjBmNTU5NTcyZmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy9GdWxsTG9nby5wbmciLCJpYXQiOjE3NTMzNTU5NjgsImV4cCI6MTc4NDg5MTk2OH0.WYqJG6Nbey1KMp6wI_YDKUHHbUQXIvsEhfatd3JpUXs",
        }}
        height={200}
        width={200}
        borderRadius={40}
      />
    
      <SignInForm></SignInForm>

      <CustomText>or</CustomText>
      <Pressable
        onPress={() => {
          navigation.navigate("Sign Up");
        }}
        style={styles.button}
      >
        <CustomText style={styles.buttonText}>Sign Up</CustomText>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate("Home");
        }}
        style={styles.button}
      >
        <CustomText style={styles.buttonText}>Bypass</CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    backgroundColor: "#2d1d46",
    padding: 8,
    margin: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5f8aa4",
  },
  input: {
    height: 20,
    fontSize: 18,
    padding: 14,
    borderColor: "#2d1d46",
    borderRadius: 100,
    borderWidth: 4,
    margin: 8,
    width: 300,
  },
  buttonText: {
    color: "#f5ddba",
    fontSize: 15,
  },
});
