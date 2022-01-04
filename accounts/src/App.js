import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import Stores from "./components/Stores";
import AddStores from "./components/Forms/AddStores";

function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/" element={<Login />} />
        <Route path = "/signup" element= {<SignUp/>} />
        <Route path = "/:id/my-stores" element = {<Stores/>} />
        <Route path = "/my-stores/new" element = {<AddStores/>} />
      </Routes>
    </Router>
  );
}

export default App;
