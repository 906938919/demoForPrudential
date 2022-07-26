import { getList } from "@/api"

export default {
  namespace: "index",
  state: {
    count: 1,
    list: []
  },
  reducers: {
    add(state, action) {
      state.count += action.payload
    },
    sub(state, action) {
      state.count -= action.payload
    },
    setList(state, action) {
      state.list = action.payload
    }
  },

  effects: {
    * getCnodeList(state, { call, put }) {
      const res = yield call(getList, action.payload)
      yield put({ type: 'setList', payload: res.data })
    }
  }
}