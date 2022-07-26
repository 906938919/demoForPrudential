import { produce } from 'immer'
import { GOOD_CATE, GOOD_DELETE, GOOD_LIST } from '../actionTypes'

const initState = {
  cates: [],
  goodList: [],
  total: 0
}

export default function (state = initState, { type, payload }) {
  return produce(state, newState => {
    switch (type) {
      case GOOD_CATE:
        newState.cates = payload.list
        break
      case GOOD_LIST:
        newState.goodList = payload.list
        newState.total = payload.total
        break
      default:
    }
  })
}