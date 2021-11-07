import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/NavBar';
import Products from './pages/Products';
import AddProducts from './pages/AddProducts'
import Collections from './pages/Collections';
import AddCollections from './pages/AddCollections';
import ProductDetail from './pages/ProductDetail';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
      
      <Navbar />
      <Sidebar />
      <div className = "content-wrapper">
        <ProductDetail />
        {/* <AddProducts /> */}
        {/* <Switch>
          <Route path = "/products" component = {Products}/>
          <Route path = "/addproduct" component = {AddProducts}/>
          <Route path = "/collections" component = {Collections} />
          <Route path = "/addcollection" component = {AddCollections} />
        </Switch> */}
      </div>
    </div>
  );
}

export default App;
