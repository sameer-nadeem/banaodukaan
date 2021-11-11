import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/NavBar';
import Products from './pages/Products';
import AddProducts from './pages/AddProducts'
import Collections from './pages/Collections';
import AddCollections from './pages/AddCollections';
import ProductDetail from './pages/ProductDetail';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import CollectionDetail from './pages/CollectionDetail';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Navbar />
        <Sidebar />
        <div className="content-wrapper">
          <Switch>
            <Route path="/products" component={Products} />
            <Route path="/addproduct" component={AddProducts} />
            <Route path="/collections" component={Collections} />
            <Route path="/addcollection" component={AddCollections} />
            <Route path="/productdetail" component={ProductDetail} />
            <Route path="/collectiondetail" component={CollectionDetail} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
