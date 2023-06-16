import React from 'react';
import { Dimensions, FlatList, Text, View } from "react-native";
import MovieItem from "./movieItem";
import CustomBottomModal from "../common/customBottomModal";
const { width } = Dimensions.get("screen");
function FavoriteMovieList({movieList}){
  const pageWidth = width;
  return (
    <>
    <FlatList
      automaticallyAdjustContentInsets={false}
      horizontal
      data={movieList}
      showsHorizontalScrollIndicator={false}
      snapToInterval={pageWidth}
      renderItem={({ item }) => {
        return <MovieItem item={item} />;
      }} />
      </>
  );
}

export default React.memo(FavoriteMovieList);
