import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  useColorScheme,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

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

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "aa9053913fbf30c4ec2f4307ecba00f7";

const Container = styled.ScrollView``;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const TrendingContainer = styled.View`
  margin-bottom: 40px;
`;
const TrendingTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#fff" : "#000")};
  font-size: 18px;
  font-weight: 700;
  margin-left: 20px;
`;
const Scroll = styled.ScrollView`
  margin-top: 20;
`;
const ComingSoonTitle = styled(TrendingTitle)`
  margin-bottom: 20px;
`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [tredingMovies, setTredingMovies] = useState([]);
  const getTrending = async () => {
    const { results } = await (
      await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    ).json();
    setTredingMovies(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=1`
      )
    ).json();
    setUpComingMovies(results);
  };
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1`
      )
    ).json();
    setNowPlayingMovies(results);
  };
  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
        {nowPlayingMovies.map((movie) => (
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
        <TrendingTitle isDark={isDark}>Treding Movies</TrendingTitle>
        <Scroll
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
        >
          {tredingMovies.map((movie) => (
            <VMedia
              key={movie.id}
              id={movie.id}
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
            />
          ))}
        </Scroll>
      </TrendingContainer>
      <ComingSoonTitle isDark={isDark}>Coming Soon</ComingSoonTitle>
      {upComingMovies.map((movie) => (
        <HMedia
          key={movie.id}
          id={movie.id}
          posterPath={movie.poster_path}
          originalTitle={movie.original_title}
          releaseDate={movie.release_date}
          overview={movie.overview}
        />
      ))}
    </Container>
  );
};

export default Movies;
