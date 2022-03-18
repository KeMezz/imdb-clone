const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "aa9053913fbf30c4ec2f4307ecba00f7";

const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((response) =>
    response.json()
  );

const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=1`
  ).then((response) => response.json());

const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1`
  ).then((response) => response.json());

export const getMovies = { trending, upcoming, nowPlaying };
