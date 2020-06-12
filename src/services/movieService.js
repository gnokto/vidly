import http from "./httpService";

const config = {
  apiBaseEndpoint: "http://localhost:3900/api",
};

export function getMovies() {
  return http.get(config.apiBaseEndpoint + "/movies");
}
export function deleteMovie(movieId) {
  return http.delete(config.apiBaseEndpoint + "/movies/" + movieId);
}
