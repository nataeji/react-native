import React from 'react';
import { Dimensions, FlatList, Text, View } from "react-native";
import MovieItem from "./movieItem";
import CustomBottomModal from "../common/customBottomModal";
import { FlashList } from "@shopify/flash-list";
const { width } = Dimensions.get("screen");
function PlayingMovieList({movieList, onEndReached}){
  const pageWidth = width;
  return (
    <>
    <FlashList
      data={movieList}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.75}
      estimatedItemSize={200}
      renderItem={({ item }) => {
        return <MovieItem item={item} />;
      }} />
      </>
  );
}

export default React.memo(PlayingMovieList);
