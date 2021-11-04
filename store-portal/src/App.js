import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/NavBar';

function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
    </div>
  );
}

export default App;
