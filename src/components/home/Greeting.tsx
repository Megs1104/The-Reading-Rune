import React, { useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { supabase } from '../../../supabase'
import { CustomText } from '../CustomText';

const Greeting = () => {
const [error, setError] = useState<string | null>(null);
const [firstName, setFirstName] = useState<string>("");
    const getCurrentUsersName = async () => {
        const {data: {user}, error: userError} = await supabase.auth.getUser();

        if (userError || !user){
            setError(userError?.message || "No user found.")
            return null;
        }

        const {data, error} = await supabase
        .from("user_information")
        .select("name")
        .eq("id", user.id)
        .single()

        if(error){
            setError(error.message)
            return null;
        }

        setFirstName(data.name);
    }

  return (
    <View style={styles.container}>
        <CustomText style={styles.greetingText}>Welcome back{firstName? `, {firstName}` : ""}!</CustomText>
        <Image
                source={{
                  uri: "https://nzziroohrdngtpurdfxm.supabase.co/storage/v1/object/sign/logos/Dragon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZGY3Nzk5OC03NWU4LTRmZmEtOGY1My0xZjBmNTU5NTcyZmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy9EcmFnb24ucG5nIiwiaWF0IjoxNzU4MDMzODk0LCJleHAiOjIwNzMzOTM4OTR9.JX0c4Odav4gCTJfaop_qhgZv53vSDazIdpkaCbTJWxo",
                }}
                height={70}
                width={70}
                style={styles.image}
        />
    </View>
  )

}

export default Greeting

const styles = StyleSheet.create({
    container:{
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#27123c",
    justifyContent: "space-between"
    },
    greetingText: {
        fontSize: 20,
        color: "#f5ddba",
        padding: 10,
    },
    image: {
        marginRight: 8,
    }
})