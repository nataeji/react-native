import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import CustomBottomModal from "../common/customBottomModal";

const { width, height } = Dimensions.get("window");

function MovieItem({ item }) {
  return (
    <>
      <View>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
          style={{ width, height: height, resizeMode: "cover" }}
        />
      </View>
      <CustomBottomModal item={item}/>
    </>
  );
}

export default React.memo(MovieItem);
