import { message } from 'antd';
import { STUDY_COUNT_ADD, STUDY_COUNT_SUB, STUDY_CNODE_LIST, GLOBAL_SIDER_LOGO, GLOBAL_THEME, GLOBAL_SIZE, GLOBAL_LANG, USER_LOGIN, USER_INFO, USER_RESET } from '../actionTypes'
import { fetchList, fetchLogin, fetchUserInfo } from '../../api'


export function addCount(payload) {
  return { type: STUDY_COUNT_ADD, payload }
}

export function subCount(payload) {
  return { type: STUDY_COUNT_SUB, payload }
}

export function getNodeList(payload) {
  return function (dispatch) {
    fetchList(payload).then(res => {
      dispatch({ type: STUDY_CNODE_LIST, payload: res })
    })
  }
}

export function toggleLogo(payload) {
  return { type: GLOBAL_SIDER_LOGO, payload: "" }
}

export function toggleTheme(payload) {
  return { type: GLOBAL_THEME, payload }
}

export function toggleAntdSize(payload) {
  return { type: GLOBAL_SIZE, payload }
}

export function toggleAntdLang(payload) {
  return { type: GLOBAL_LANG, payload }
}

export function login(payload) {
  return function (dispatch) {
    fetchLogin(payload).then(res => {
      dispatch({ type: USER_LOGIN, payload: res.data.token })
      if (res.err === 0) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
    })
  }
}

export function getInfo(payload) {
  return function (dispatch) {
    fetchUserInfo(payload).then(res => {
      dispatch({ type: USER_INFO, payload: res.data })
    })
  }
}

export function reset(payload) {
  return { type: USER_RESET, payload }
}