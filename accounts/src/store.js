import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer } from './reducers/authReducers'


const rootReducer = combineReducers({
  auth: authReducer
})


const token = localStorage.getItem('token')
console.log(token)
const initialState = {
  auth: {
    token: token,
    isAuthenticated: token !== null,
    loading: false,
    user: null
  }
}
console.log(initialState)

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))


export default store
