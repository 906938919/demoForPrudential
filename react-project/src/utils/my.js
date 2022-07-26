import React, { useEffect, useContext, useState, useReducer } from 'react'
import { ReactReduxContext } from 'react-redux'

// connect(mapStateToProps, mapDispatchToProps)(UI)

export function myconnect1(mapStateProps, mapDispatchToProps) {
  // const state = mapStateProps(state);
  return function (WrappedComponent) {
    let unsubscribe = null
    class NewWC extends React.PureComponent {
      componentDidMount() {
        const { store } = this.context;
        unsubscribe = store.subscribe(() => {
          this.forceUpdate()
        })
      }
      componentWillUnmount() {
        unsubscribe()
      }

      render() {
        const { store } = this.context;
        const state = mapStateProps(store.getState())
        const methods = mapDispatchToProps(store.dispatch)
        return (
          <WrappedComponent {...this.props} {...state} {...methods}></WrappedComponent>
        )
      }
    }
    NewWC.contextType = ReactReduxContext
    return NewWC
  }
}

export function myconnect2(mapStateProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    return props => {
      const { store } = useContext(ReactReduxContext)
      const state = mapStateProps(store.getState())
      const methods = mapDispatchToProps(store.dispatch)
      const [count, setCount] = useState(0)
      useEffect(() => {
        const unsubscribe = store.subscribe(() => {
          setCount(count => count + 1)
        })
        return () => { unsubscribe() }
      }, [])
      return (
        <WrappedComponent {...props} {...state} {...methods}></WrappedComponent>
      )
    }
  }
}

export function useSelector1(mapState) {
  const { store } = useContext(ReactReduxContext)
  const [state, setState] = useState(mapState(store.getState()))
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(mapState(store.getState()))
    })
    return () => unsubscribe()
  }, [])
  return state
}


export function useSelector2(mapState) {
  const { store } = useContext(ReactReduxContext)
  const [_, dispatch] = useReducer(s => s + 1, 0)
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      dispatch()
    })
    return () => unsubscribe()
  }, [])
  return mapState(store.getState())
}