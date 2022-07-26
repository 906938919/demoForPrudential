import { produce } from 'immer'
import { STUDY_COUNT_ADD, STUDY_COUNT_SUB, STUDY_CNODE_LIST } from '../actionTypes'

const initState = {
  count: 1,
  list: [1, 2, 3, 4]
}

export default function (state = initState, { type, payload }) {
  return produce(state, newState => {
    switch (type) {
      case STUDY_COUNT_ADD:
        newState.count += payload
        break;
      case STUDY_COUNT_SUB:
        newState.count -= payload
        break;
      case STUDY_CNODE_LIST:
        newState.list = payload
        break
      default:
    }
  })
}