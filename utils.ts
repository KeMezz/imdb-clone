export const makeImagePath = (backdrop_path: string, size: string = "w500") =>
  `https://image.tmdb.org/t/p/${size}${backdrop_path}`;
