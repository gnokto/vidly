import http from "./httpService";
import config from "../config.json";

export function getMovies() {
  return http.get(config.apiBaseEndpoint + "/movies");
}
export function deleteMovie(movieId) {
  return http.delete(config.apiBaseEndpoint + "/movies/" + movieId);
}
