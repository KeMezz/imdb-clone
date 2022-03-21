import React from "react";
import { View, FlatList, Dimensions, useColorScheme } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { getTVs, TVResponse } from "../api";
import Loader from "../components/Loader";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

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

const TV = () => {
  const isDark = useColorScheme() === "dark";

  const queryClient = useQueryClient();
  const onRefresh = async () => {
    queryClient.refetchQueries("tv");
  };

  const {
    isLoading: airingLoading,
    data: airingData,
    isRefetching: isRefetchingAiring,
  } = useQuery<TVResponse>(["tv", "airingToday"], getTVs.airingToday);
  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isRefetching: isRefetchingTopRated,
  } = useQuery<TVResponse>(["tv", "topRated"], getTVs.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<TVResponse>(["tv", "trending"], getTVs.trending);

  const isLoading = airingLoading || topRatedLoading || trendingLoading;
  const refreshing =
    isRefetchingTrending || isRefetchingAiring || isRefetchingTopRated;

  return isLoading ? (
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
            {airingData?.results.map((tv) => (
              <Slide
                key={tv.id}
                id={tv.id}
                backdropPath={tv.backdrop_path || ""}
                posterPath={tv.poster_path || ""}
                originalTitle={tv.original_name}
                overview={tv.overview}
                voteAverage={tv.vote_average}
              />
            ))}
          </Swiper>
          <TrendingContainer>
            <Title isDark={isDark}>Trending TV Shows</Title>
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
                  originalTitle={item.original_name}
                  voteAverage={item.vote_average}
                />
              )}
            />
          </TrendingContainer>
          <Title isDark={isDark}>Top Rated</Title>
        </>
      }
      data={topRatedData?.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      contentContainerStyle={{ marginBottom: 30 }}
      renderItem={({ item }) => (
        <HMedia
          key={item.id}
          id={item.id}
          posterPath={item.poster_path || ""}
          originalTitle={item.original_name}
          releaseDate={item.first_air_date}
          overview={item.overview}
        />
      )}
    />
  );
};

export default TV;
