import axiosInstance from "../Interceptor/AxiosInterceptor";

const postJob = async (job) => {
  return axiosInstance
    .post(`/jobs/post`, job)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
const getAllJobs = async () => {
  return axiosInstance
    .get(`/jobs/getAll`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
const getJob = async (id) => {
  return axiosInstance
    .get(`/jobs/get/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
const applyJob = async (id, applicant) => {
  return axiosInstance
    .post(`/jobs/apply/${id}`, applicant)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const getJobsPostedBy = async (id) => {
  return axiosInstance
    .get(`/jobs/postedBy/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
const changeAppStatus = async (application) => {
  return axiosInstance
    .post(`/jobs/changeAppStatus`, application)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export {
  postJob,
  getAllJobs,
  getJob,
  applyJob,
  getJobsPostedBy,
  changeAppStatus,
};
