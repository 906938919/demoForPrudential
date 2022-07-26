import styles from './index.less';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'umi'
import { Button } from "antd"

export default function IndexPage() {
  const { count, list } = useSelector(state => state.index)
  const dispatch = useDispatch()

  const sub = () => {
    dispatch({ type: "index/sub", payload: 1 })
  }

  const add = () => {
    dispatch({ type: "index/add", payload: 1 })
  }
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <span>{count}</span>
      <Button onClick={() => sub()}>减少</Button>
      <Button onClick={() => add()}> 增加</Button>
    </div >
  );
}
