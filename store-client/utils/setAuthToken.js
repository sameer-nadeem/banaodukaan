import axios from 'axios'

const setAuthToken = () => {
  const token = localStorage.getItem('customerToken')
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    console.log('token removed')
    delete axios.defaults.headers.common['x-auth-token']
  }
}


export default setAuthToken
