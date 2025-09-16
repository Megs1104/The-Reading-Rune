import React, { useState } from 'react'
import { ActivityIndicator, Alert, Pressable, TextInput, View, StyleSheet } from 'react-native'
import { supabase } from '../../../supabase';
import { CustomText } from '../CustomText';

const SignUpForm = () => {
type SignUpInput ={
    firstName: string;
    email: string;
    password: string;

};
const [firstName, setFirstName] = useState<string>("");
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [showPassword, setShowPassword] = useState<boolean>(false);

const [firstNameInputError, setFirstNameInputError] = useState<string | null>(null);
const [emailInputError, setEmailInputError] = useState<string | null>(null);
const [passwordInputError, setPasswordInputError] = useState<string | null>(null);


const signUpWithEmail = async ({ firstName, email, password }: SignUpInput) => {
    const {data: {user, session}, error,} = await supabase.auth.signUp({email: email, password: password})
    if (error){
      setError(error.message)
    }
   
    if (!user){
        throw new Error("User signup successful but no user object returned")
    }

     const {error: insertError} = await supabase
        .from("user_information")
        .insert({
            id: user.id,
            name: firstName,        
    });

    if (insertError){
        setError(insertError.message)
    }

     if (!session){
        Alert.alert('Please check your inbox for email verification.')
    }
  };
       

  const handleSignUp = async ({firstName, email, password}: SignUpInput) => {
    setLoading(true);
    try{
      await signUpWithEmail({firstName, email, password});
    }catch (error: any){
      setError(error.message)
    }finally{
      setLoading(false)
    }
  };

   const handleInputChange = async (
    field: "email" | "password" | "firstName",
    value: string
  ) => {
    if (field === "email") {
      setEmail(value.trim());
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^s\@]+$/;

      if (!emailRegex.test(value)) {
        setEmailInputError("Please enter a valid e-mail address.");
        return;
      } else {
        setError(null);
      }
    }else if (field === "password") {
      setPassword(value);
      if (value.length < 8) {
        setPasswordInputError("Password must be a least 8 characters.");
      } else {
        setError(null);
      }
    }else if (field === "firstName"){
        setFirstName(value.trim());
        if(value.includes(" ")){
            setFirstNameInputError("Please remove any spaces to only include your first name.");
        }else{
            setError(null);
        };
    };
  };

  return (
    <View style={styles.container}>

    {firstNameInputError ? (
        <CustomText style={styles.errorText}>{firstNameInputError}</CustomText>
    ) : null}

    <TextInput
      placeholder='First Name'
      value={firstName}
      onChangeText={(text) => handleInputChange("firstName", text)}
      autoCapitalize='words'
      style={styles.input}
      />

    {emailInputError ? (
        <CustomText style={styles.errorText}>{emailInputError}</CustomText>
    ) : null}

    <TextInput
      placeholder='E-mail'
      value={email}
      onChangeText={(text) => handleInputChange("email", text)}
      style={styles.input}
      />

     {passwordInputError ? (
        <CustomText style={styles.errorText}>{passwordInputError}</CustomText>
    ) : null}

    <TextInput
      placeholder='Password'
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
        <ActivityIndicator size="small" color="#000"/>
      ) : (
        <Pressable
        onPress={() => handleSignUp({firstName, email, password})}
        style={styles.button}
        >
            <CustomText style={styles.buttonText}>Sign Up</CustomText>
        </Pressable>
      )}
    </View>
  )
}

export default SignUpForm


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
    flex: 1,
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