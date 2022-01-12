import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import Stores from "./pages/Stores";
import AddStores from "./pages/AddStores";
import setAuthToken from './utils/setAuthToken';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

if (localStorage.token) {
  setAuthToken();
}

function App() {
  const token = useSelector(state => state.auth.token)
  useEffect(() => {
    setAuthToken()
  }, [token])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-stores" element={<Stores />} />
        <Route path="/my-stores/new" element={<AddStores />} />
      </Routes>
    </Router>
  );
}

export default App;
