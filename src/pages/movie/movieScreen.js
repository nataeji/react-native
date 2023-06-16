import React, { useCallback } from "react";
import AppLayout from "../../components/appLayout";
import Loading from "../../components/common/loading";
import { useDispatch, useSelector } from "react-redux";
import PlayingMovieList from "../../components/playingMovie/playingMovieList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getPlaingMovieProc } from "../../store/slice/playingMovie";

function MovieScreen() {
  const {loading, error, filter, playingMovieList} = useSelector(state => state.playingMovie);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //페이지 선택될때 마다 새로 데이터를 가져온다.(useEffect - 페이지 처음로딩 되었을때만.)
  useFocusEffect(useCallback(() => {
      dispatch(getPlaingMovieProc(filter));
    },[dispatch]),
  );

  const onEndReachedHandler = useCallback(() => {
    console.log("===================onEndReachedHandlerFilter : ======================");
    const newFilter = {
      ...filter,
      page: filter.page + 1
    }
    dispatch(getPlaingMovieProc(newFilter));
  }, [dispatch, filter]);
  return (
    <AppLayout title="영화정보">
      {loading && <Loading />}
      <PlayingMovieList movieList={playingMovieList} onEndReached={onEndReachedHandler}/>
    </AppLayout>
  );
}

export default React.memo(MovieScreen);
