/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import Axios from 'axios'

const authAxios = Axios.create({
  baseURL: 'http://localhost:4000',
})

authAxios.interceptors.request.use(
  async function (options) {
    const token = localStorage.getItem('token')
    if (token) {
      options.headers.Authorization = `Bearer ${token}`
    }

    return options
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default authAxios
