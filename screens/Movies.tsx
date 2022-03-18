import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  useColorScheme,
  FlatList,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { getMovies } from "../api";

interface iMovieResults {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface iMovie {
  page: number;
  results: iMovieResults[];
  total_pages: number;
  total_results: number;
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const TrendingContainer = styled.View`
  margin-bottom: 40px;
`;
const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#fff" : "#000")};
  font-size: 18px;
  font-weight: 700;
  margin-left: 20px;
  margin-bottom: 20px;
`;
const TrendingFlat = styled.FlatList``;
const VSeparator = styled.View`
  width: 12px;
`;
const HSeparator = styled.View`
  height: 20px;
`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";

  const onRefresh = async () => {
    queryClient.refetchQueries("movies");
  };
  const renderVMedia = ({ item }) => (
    <VMedia
      id={item.id}
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );
  const renderHMedia = ({ item }) => (
    <HMedia
      key={item.id}
      id={item.id}
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      releaseDate={item.release_date}
      overview={item.overview}
    />
  );

  const queryClient = useQueryClient();
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(["movies", "trending"], getMovies.trending);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery(["movies", "upcoming"], getMovies.upcoming);
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(["movies", "nowPlaying"], getMovies.nowPlaying);

  const loading = trendingLoading || upcomingLoading || nowPlayingLoading;
  const refreshing =
    isRefetchingTrending || isRefetchingUpcoming || isRefetchingNowPlaying;

  const getData = async () => {
    await Promise.all([trendingData(), upcomingData(), nowPlayingData()]);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT / 4,
              marginBottom: 40,
            }}
          >
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                id={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                overview={movie.overview}
                voteAverage={movie.vote_average}
              />
            ))}
          </Swiper>
          <TrendingContainer>
            <Title isDark={isDark}>Treding Movies</Title>
            <TrendingFlat
              data={trendingData.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              ItemSeparatorComponent={VSeparator}
              renderItem={renderVMedia}
            />
          </TrendingContainer>
          <Title isDark={isDark}>Coming Soon</Title>
        </>
      }
      data={upcomingData.results}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={HSeparator}
      contentContainerStyle={{ marginBottom: 30 }}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
