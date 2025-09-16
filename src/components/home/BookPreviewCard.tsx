import React from 'react'
import { Pressable, View, Image, StyleSheet } from 'react-native'

const BookPreviewCard = () => {
  return (
    <View style={styles.container}>
      <Pressable>
         <Image
            source={{
            uri: "https://tse1.mm.bing.net/th/id/OIP.RYXpayl_ei2beVrviYY-SAHaL0?r=0&pid=Api",
            }}
            height={100}
            width={67}
        />
      </Pressable>
    </View>
  )
}

export default BookPreviewCard

const styles=StyleSheet.create({
    container:{
        padding: 8,
    }
})
