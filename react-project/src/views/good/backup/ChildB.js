import { useSelector, useDispatch } from "react-redux";
import { addCount, subCount } from '@/store/actions'

import { useSelector1, useSelector2 } from "@/utils/my"


export default () => {
  const dispatch = useDispatch()
  const { count } = useSelector2(state => state.study)
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => { dispatch(addCount(100)) }}>增加</button>
      <br />
      <button onClick={() => { dispatch(subCount(50)) }}>减少</button>
    </div>
  )
}