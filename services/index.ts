import { HttpStatus } from "@/type/enum";
import axios from "axios";
import { Alert } from "react-native";

const API_KEY = "7710946d441b90a146a8551bb6b3707e";
// const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const axiosClient = axios.create({
  baseURL: `https://api.themoviedb.org`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  params: {
    api_key: API_KEY,
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status === HttpStatus.Unauthorized) {
      Alert.alert("Error", "Your session has expired. Please login again.");
    }
    if (res.status === HttpStatus.Forbidden) {
      Alert.alert(
        "Error",
        "You don't have permission to access this resource."
      );
    }
    if (res.status === HttpStatus.NotFound) {
      Alert.alert("Error", "Resource not found.");
    }
    if (res.status === HttpStatus.InternalServerError) {
      Alert.alert("Error", "Internal server error.");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
