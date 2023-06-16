import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";
const RequestApi = axios.create({
    //baseURL:'https://reqres.in/api',
    //baseURL:'/', //로컬에서 개발할 경우 이것을 사용.
    withCredentials: true,
});

RequestApi.interceptors.request.use(
  async function (config) {
    //localstorage에 저장된 값을 불러온다.
    //const accessToken = `Bearer ${await EncryptedStorage.getItem("accessToken")}`;
    //const refreshToken = `Bearer ${await EncryptedStorage.getItem("refreshToken")}`;
    //영화사이트 데이터 가져오기.
    const accessToken = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDA4YTk2YTIyMWRkN2FlM2Q1Yjc2M2QwNzI1MTQ5ZSIsInN1YiI6IjYyNDYwYTI4ZGQ0N2UxMDA5ZjQ1MmJkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2lgE2Fw_MsENdIFVgRt3r7RvMplmbxa3PoDPHjy-IOU`;
    const refreshToken = `Bearer ${await EncryptedStorage.getItem("refreshToken")}`;
    console.log("config.url : ", config.url);

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    config.headers.Authorization = `${accessToken}`;

    //리프래시 토큰일 경우 해더의 authorization값을 refreshTokem 으로 교체해서 보낸다.
    if(config.url === "/refreshToken"){
        config.headers.Authorization = `${refreshToken}`;
    }

    return config;
  },
  function (error) {
    console.log("error: ", error);
    return Promise.reject(error);
  }
);
RequestApi.interceptors.response.use(
  function (response) {
    console.log("=================== Response START =======================");
    console.log(response);
    console.log("=================== Response END =========================");
    return response;
  },

  async function (error) {
    console.log("============== Response Error START =======================");
    console.log(error);
      //response:{status} 의 의미는 error.response.status을 가져오란 의미
      const { config, response: { status } } = error;
      if (status === 419) {
          if (error.response.data.message === "TokenExpired") {
              console.log("***********************************");
              console.log("엑세스토큰 만료");
              const originRequest = config;
              //const refreshToken = await localStorage.getItem("refreshToken");
              const { data } = await RequestApi.post(`/refreshToken`, {}, );
              await localStorage.setItem("accessToken", data.data.accessToken);
              originRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
              return axios(originRequest); //이전에 요청했던 작업을 수행한다.
              console.log("***********************************");
          }
      }
    console.log("============== Response Error END =========================");
    return Promise.reject(error);
  }
);

export default RequestApi;
