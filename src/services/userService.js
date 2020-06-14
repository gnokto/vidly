import http from "./httpService";
import { apiBaseEndpoint } from "../config.json";

const apiEndpoint = apiBaseEndpoint + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
