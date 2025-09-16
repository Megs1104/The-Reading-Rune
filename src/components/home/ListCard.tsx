import React from 'react'
import { Pressable, View, StyleSheet} from 'react-native'
import { CustomText } from '../CustomText'
import BookPreviewCard from './BookPreviewCard'

type ListCardProps = {
    listName: string,
}

const ListCard = ({listName} : ListCardProps) => {
  return (
    <View style={styles.container}>
        <Pressable style={styles.button}>
         <CustomText style={styles.buttonText}>{listName === "wishlist" ? "Wishlist" : "TBR"}</CustomText>   
        </Pressable>
        <View style={styles.booksContainer}>
          <BookPreviewCard />
          <BookPreviewCard />
         <BookPreviewCard /> 
        </View>
       
    </View>
  )
}



export default ListCard

const styles=StyleSheet.create({
    container: {
    flexDirection: "row",
    borderColor: "#2d1d46",
    borderWidth: 4,
    margin: 8,
    borderRadius: 8,
    alignItems: "center",
    },
    button: {
    borderRadius: 8,
    backgroundColor: "#2d1d46",
    padding: 8,
    margin: 8,
    maxHeight: 45,
    minWidth: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#f5ddba",
    fontSize: 18,
  },
  booksContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  }
})