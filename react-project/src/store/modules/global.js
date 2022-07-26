import { produce } from 'immer'
import { GLOBAL_SIDER_LOGO, GLOBAL_THEME, GLOBAL_SIZE, GLOBAL_LANG } from '../actionTypes'

function isSideLogo() {
  if (localStorage.getItem('sideLogo')) {
    return localStorage.getItem('sideLogo') == 1 ? true : false
  } else {
    return true
  }
}

const initState = {
  sideLogo: isSideLogo(),
  theme: localStorage.getItem('theme') || "#1890ff",
  antdSize: localStorage.getItem('antdSize') || "small",
  antdLang: localStorage.getItem('antdLang') || "zh",
}

export default function (state = initState, { type, payload }) {
  return produce(state, newState => {
    switch (type) {
      case GLOBAL_SIDER_LOGO:
        newState.sideLogo = !newState.sideLogo
        localStorage.setItem('sideLogo', newState.sideLogo == true ? 1 : 0)
        break
      case GLOBAL_THEME:
        newState.theme = payload
        localStorage.setItem('theme', newState.theme)
        break
      case GLOBAL_SIZE:
        newState.antdSize = payload
        localStorage.setItem('antdSize', newState.antdSize)
        break
      case GLOBAL_LANG:
        newState.antdLang = payload
        localStorage.setItem('antdLang', newState.antdLang)
        break
      default:
    }
  })
}