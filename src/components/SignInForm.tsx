import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { TextInput, View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { CustomText } from './CustomText';

const SignInForm = () => {
type SignInInput = {
  email: string;
  password: string;
};

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { signIn } = useAuth();
  const navigation = useNavigation();

  const handleSignIn = async ({ email, password }: SignInInput) => {
    setLoading(true);
    try {
      await signIn({ email, password });
    } catch (error: any) {
      setError(error.message || "Sign in failed, plesae try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = async (
    field: "email" | "password",
    value: string
  ) => {
    if (field === "email") {
      setEmail(value.trim());

      if (!value.includes("@")) {
        setError("Please enter a valid e-mail address.");
        return;
      } else {
        setError(null);
      }
    }

    if (field === "password") {
      setPassword(value);
      if (value.length < 8) {
        setError("Password must be a least 8 characters.");
      } else {
        setError(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
              placeholder="E-mail"
              value={email}
              onChangeText={() => handleInputChange("email", email)}
              autoCapitalize="none"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={() => handleInputChange("password", password)}
              secureTextEntry
              style={styles.input}
            />
      
            {error ? (
              <CustomText style={styles.buttonText}>{error}</CustomText>
            ) : null}
      
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Pressable
                style={styles.button}
                onPress={() => handleSignIn({ email, password })}
              >
                <CustomText style={styles.buttonText}>Sign In</CustomText>
              </Pressable>
            )}
    </View>
  )
}

export default SignInForm


const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    backgroundColor: "#2d1d46",
    padding: 8,
    margin: 8,
  },
  container: {
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