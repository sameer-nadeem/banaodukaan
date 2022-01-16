import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import Stores from "./pages/Stores";
import AddStores from "./pages/AddStores";
import setAuthToken from './utils/setAuthToken';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import PrivateRoute from './components/Routing/PrivateRoute'
import Navbar from "./components/Layout/Navbar"
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken();
}

function App() {
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  console.log("token", token)
  useEffect(() => {
    setAuthToken()
  }, [token])

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/my-stores" element={<Stores />} /> */}
        <Route
          path="/my-stores"
          element={<PrivateRoute component={Stores} />}
        />
        <Route
          path="/my-stores/new"
          element={<PrivateRoute component={AddStores} />}
        />
        {/* <Route path="/my-stores/new" element={<AddStores />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
