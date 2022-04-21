import React, { useState } from "react";
import { Dimensions, useColorScheme, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery, useQueryClient } from "react-query";
import { getMovies, MovieResponse } from "../api";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import Loader from "../components/Loader";

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
const TrendingFlat = styled.FlatList`` as unknown as typeof FlatList;
const VSeparator = styled.View`
  width: 12px;
`;
const HSeparator = styled.View`
  height: 20px;
`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";

  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries("movies");
    setRefreshing(false);
  };

  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(["movies", "trending"], getMovies.trending);
  const { isLoading: upcomingLoading, data: upcomingData } =
    useQuery<MovieResponse>(["movies", "upcoming"], getMovies.upcoming);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], getMovies.nowPlaying);

  const loading = trendingLoading || upcomingLoading || nowPlayingLoading;

  return loading ? (
    <Loader />
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
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                id={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                overview={movie.overview}
                voteAverage={movie.vote_average}
              />
            ))}
          </Swiper>
          <TrendingContainer>
            <Title isDark={isDark}>Trending Movies</Title>
            <TrendingFlat
              data={trendingData?.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id + ""}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              ItemSeparatorComponent={VSeparator}
              renderItem={({ item }) => (
                <VMedia
                  id={item.id}
                  posterPath={item.poster_path || ""}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                />
              )}
            />
          </TrendingContainer>
          <Title isDark={isDark}>Coming Soon</Title>
        </>
      }
      data={upcomingData?.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      contentContainerStyle={{ marginBottom: 30 }}
      renderItem={({ item }) => (
        <HMedia
          key={item.id}
          id={item.id}
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          releaseDate={item.release_date}
          overview={item.overview}
        />
      )}
    />
  );
};

export default Movies;
