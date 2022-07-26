import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import study from "./modules/study"
import global from "./modules/global"
import user from "./modules/user"
import good from "./modules/good"




const store = createStore(
  combineReducers({
    study, global, user, good
  }),
  compose(applyMiddleware(thunk), applyMiddleware(logger))
)

export default store