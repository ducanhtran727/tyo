import axios from "axios"

const axiosInstance = axios.create({})

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    // config.headers.set('X-Client-Id', `${localStorage.getItem('accessToken')}`)
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosInstance
