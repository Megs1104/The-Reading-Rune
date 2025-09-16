import React from 'react'
import { Pressable, View, StyleSheet } from 'react-native'
import { CustomText } from '../CustomText'

const ScanButton = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <CustomText style={styles.buttonText}>Scan a book</CustomText>
      </Pressable>
    </View>
  )
}

export default ScanButton

const styles=StyleSheet.create({
    container:{
    alignItems: "center",
    },
    button: {
    borderRadius: 100,
    backgroundColor: "#2d1d46",
    padding: 8,
    margin: 8,
  },
   buttonText: {
    color: "#f5ddba",
    fontSize: 18,
  },
})