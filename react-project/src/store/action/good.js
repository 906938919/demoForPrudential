import { GOOD_CATE, GOOD_LIST } from '../actionTypes'
import { fetchGoodCate, fetchGoodList } from '../../api'

export function getGoodCate(payload) {
  return function (dispatch) {
    fetchGoodCate(payload).then(res => {
      dispatch({ type: GOOD_CATE, payload: res.data })
    })
  }
}

export function getGoodList(payload) {
  return function (dispatch) {
    fetchGoodList(payload).then(res => {
      dispatch({ type: GOOD_LIST, payload: res.data })
    })
  }
}