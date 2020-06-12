import http from "./httpService";
import config from "../config.json";

export function getMovies() {
  return http.get(config.apiBaseEndpoint + "/movies");
}
export function getMovie(movieId) {
  return http.get(config.apiBaseEndpoint + "/movies/" + movieId);
}

export function saveMovie(movie) {
  // return http.put(config.apiBaseEndpoint + "/movies/", movie);
}

export function deleteMovie(movieId) {
  return http.delete(config.apiBaseEndpoint + "/movies/" + movieId);
}
