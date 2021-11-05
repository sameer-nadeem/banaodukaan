import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/NavBar';
import CenteredTabs from './components/CenteredTabs';

function App() {
  return (
    <div className="wrapper">
      
      <Navbar />
      <Sidebar />
      <div className = "content-wrapper">
      <CenteredTabs />
      </div>
     
    </div>
  );
}

export default App;
