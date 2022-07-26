import React from 'react'
import { connect } from 'react-redux'

import { addCount, subCount } from '@/store/actions'
import { myconnect1, myconnect2 } from "@/utils/my"

function mapStateProps(state) {
  return {
    count: state.study.count,
    list: state.study.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add(payload) {
      dispatch(addCount(payload))
    },
    sub(payload) {
      dispatch(subCount(payload))
    }
  }
}

@myconnect2(mapStateProps, mapDispatchToProps)
class ChildA extends React.PureComponent {
  render() {
    const { count, add, sub } = this.props
    return (
      <div>
        <div>{count}</div>
        <button onClick={() => { add(100) }}>增加</button>
        <br />
        <button onClick={() => { sub(50) }}>减少</button>
      </div>
    )
  }
}

export default ChildA