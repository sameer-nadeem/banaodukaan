import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({ component: RouteComponent }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  if (isAuthenticated) {
    return <RouteComponent />
  }
  return <Navigate to="/" />
}
export default PrivateRoute
