import axiosInstance from "../Interceptor/AxiosInterceptor";

const loginUser = async (login) => {
  return axiosInstance
    .post("/auth/login", login)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const navigateToLogin = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};

export { loginUser, navigateToLogin };
