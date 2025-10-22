import axiosInstance from "../Interceptor/AxiosInterceptor";

const getNotification = async (id) => {
  return axiosInstance
    .get(`/notification/get/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
const readNotification = async (id) => {
  return axiosInstance
    .put(`/notification/read/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export { getNotification, readNotification };
