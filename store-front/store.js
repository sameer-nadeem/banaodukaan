import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer } from './reducers/authReducers'
import { filterReducer } from "./reducers/filterReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  filters: filterReducer
})


const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
console.log(token)
const initialState = {
  auth: {
    token: token,
    isAuthenticated: token !== null,
    loading: false,
    user: null
  },
  filters: {
    collection: null,
    brand: null,
    sortBy: "newest",
    priceUpper: 99999999,
    priceLower: 0
  }
}
console.log(initialState)

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)


export default store
