import { useState } from 'react'
import { TextInput, View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { CustomText } from '../CustomText';
import { supabase } from '../../../supabase';

const SignInForm = () => {
type SignInInput = {
  email: string;
  password: string;
};

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailInputError, setEmailInputError] = useState<string | null>(null);
  const [passwordInputError, setPasswordInputError] = useState<string | null>(null);

  const signInWithEmail = async ({ email, password }: SignInInput) => {
    const {error} = await supabase.auth.signInWithPassword({email, password})
    if (error){
      setError(error.message);
    }
  };

  const handleSignIn = async ({email, password}: SignInInput) => {
    setLoading(true);
    try{
      await signInWithEmail({email, password});
    }catch (error: any){
      setError(error.message)
    }finally{
      setLoading(false)
    }
  };

  const handleInputChange = async (
    field: "email" | "password",
    value: string
  ) => {
    if (field === "email") {
      setEmail(value.trim());

      if (!value.includes("@")) {
        setEmailInputError("Please enter a valid e-mail address.");
        return;
      } else {
        setError(null);
      }
    }

    if (field === "password") {
      setPassword(value);
      if (value.length < 8) {
        setPasswordInputError("Password must be a least 8 characters.");
      } else {
        setError(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      {emailInputError ? (
              <CustomText style={styles.errorText}>{emailInputError}</CustomText>
            ) : null}
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => handleInputChange("email", text)}
        autoCapitalize="none"
        style={styles.input}
      />
      
      {passwordInputError ? (
              <CustomText style={styles.errorText}>{passwordInputError}</CustomText>
            ) : null}
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => handleInputChange("password", text)}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.button}
                  >
                    <CustomText style={styles.buttonText}>View Password</CustomText>
                  </Pressable>
      
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
    height: 60,
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
  errorText: {
    color: "#f5ddba",
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: "#bc5a55",
    borderRadius: 100,
    padding: 10, 
    margin: 10,
  }
});