import axios from "axios";

const apiAxiosNoAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  mode: "cors"
});

apiAxiosNoAuth.interceptors.request.use(
  function (config) {
    // Kullanıcı verisi eklenmiyor, sadece Content-Type başlığı ekleniyor
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json"
    };

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiAxiosNoAuth.interceptors.response.use(
  function (response) {
    // Do something with response data
    //console.log("Response Interceptor - Response Data: ", response.data)
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default apiAxiosNoAuth;
