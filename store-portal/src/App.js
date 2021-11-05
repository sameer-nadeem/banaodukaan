import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/NavBar';
import Products from './pages/Products';
import AddProducts from './pages/AddProducts'

function App() {
  return (
    <div className="wrapper">
      
      <Navbar />
      <Sidebar />
      <div className = "content-wrapper">
        <AddProducts />
      {/* <Products /> */}
      </div>
     
    </div>
  );
}

export default App;
