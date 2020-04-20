import axios from "axios";
import store from '../store/index'

const instance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch('logout');
    }

    return Promise.reject(error)
  }
);

export default instance;
