import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AppLayout from "../../components/appLayout";
import Geolocation from "react-native-geolocation-service";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteProc } from "../../store/slice/favoriteMovie";
import FavoriteList from "../../components/favoriteMovie/favoriteMovieList";
import Loading from "../../components/common/loading";
import CustomBottomModal from "../../components/common/customBottomModal";

function HomeScreen(){
  const {loading, error, favoriteMovieList} = useSelector(state => state.favoriteMovie);
  console.log("movieList : ", favoriteMovieList);
  const dispatch = useDispatch();
  //페이지 선택될때 마다 새로 데이터를 가져온다.(useEffect - 페이지 처음로딩 되었을때만.)
  useFocusEffect(useCallback(() => {
      const sendData = {
        include_adult : false,
        include_video : false,
        language: "ko-KR",
        page : "1",
        sort_by : "popularity.desc"
      }
      dispatch(getFavoriteProc(sendData));
      return () => {
      }
    },[dispatch]),
  );

  const navigation = useNavigation();
  return (
    <>
    <AppLayout title={"HOME"}>
      {loading && <Loading />}
      <FavoriteList movieList={favoriteMovieList} />
    </AppLayout>
      </>
  );
}

export default React.memo(HomeScreen);
