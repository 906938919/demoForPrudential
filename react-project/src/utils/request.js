import axios from 'axios'
import { message } from 'antd'
import store from "@/store"
import { reset } from '@/store/action'

const baseURL = 'http://localhost:9090'
const version = '/api/v1/react'
const instance = axios.create({
  baseURL: baseURL + version,
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  }, err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    if (response.data.err === -1) {
      message.error('登录失效，请重新登录')
      store.dispatch(reset())
    }
    return response.data
  }, err => {
    return Promise.reject(err)
  }
)

export default instance

