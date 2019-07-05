import axios from "axios";
import router from "./router";

// 请求拦截
axios.interceptors.request.use(
  config => {
    if (localStorage.wxToken) {
      config.headers.Authorization = localStorage.wxToken;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截
axios.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    // 错误提醒
    const { status } = err.response;
    if (status == 401) {
      console.log("token 过期了, 请重新登录 @ @ ");
      // 清除本地的 token
      localStorage.removeItem("wxToken");
      // 页面跳转
      router.push("/login");
    }

    console.log(err.response.data);
    return Promise.reject(err);
  }
);

export default axios;
