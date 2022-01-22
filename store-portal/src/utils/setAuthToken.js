import axios from 'axios'
import Cookies from 'universal-cookie'

const setAuthToken = () => {
  const cookies = new Cookies()
  console.log("token cookie", cookies.get("token"))
  const token = cookies.get("token")
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    console.log('token removed')
    delete axios.defaults.headers.common['x-auth-token']
  }
}


export default setAuthToken
