import React from "react";
import { Dimensions, Image, Text, View, StyleSheet } from "react-native";
import utils from "../../util/utils";

function MovieItem({ item }) {
  return (
    <>
      <View style={styles.list_grp}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
          style={{ width: 90, height: 90, borderRadius:7, resizeMode: "cover" }}
        />
        <View style={styles.content_container}>
          <Text style={styles.movie_title}>{item?.title}</Text>
          <Text style={styles.movie_content}>{utils.cutString(item?.overview, 50)}</Text>
          <Text style={styles.movie_date}>{item?.release_date}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
 list_grp : {
   borderBottomWidth:1,
   borderBottomColor:"#ddd",
   flexDirection: "row",
   width:"100%",
   padding:10,
   backgroundColor:"#fff"
 },

  content_container: {
   paddingHorizontal:10,
    flex:1,
  },

  movie_title: {
    color:"#333",
    fontWeight:600,
    marginBottom:5,
  },

  movie_content: {
    fontSize:13,
    letterSpacing:-0.5,
    color:"#555",
    marginBottom:5,

  },

  movie_date:{
    fontSize:12,
    color:"#999"
  }


});
export default React.memo(MovieItem);
