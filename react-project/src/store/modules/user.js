import { produce } from 'immer'
import { USER_LOGIN, USER_INFO, USER_PERMISSION, USER_RESET } from '../actionTypes'

const initState = {
  token: localStorage.getItem('token') || '',
  userinfo: {},
  accessRoutes: []
}

export default function (state = initState, { type, payload }) {
  return produce(state, newState => {
    switch (type) {
      case USER_LOGIN:
        newState.token = payload
        localStorage.setItem('token', payload)
        break;
      case USER_INFO:
        newState.userinfo = payload
        break
      case USER_PERMISSION:
        newState.accessRoutes = payload
        break
      case USER_RESET:
        localStorage.removeItem('token')
        newState.token = ''
        newState.userinfo = {}
        newState.accessRoutes = []
        break
      default:
    }
  })
}