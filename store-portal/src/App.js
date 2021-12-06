import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import AddProducts from './pages/AddProducts'
import Collections from './pages/Collections';
import AddCollections from './pages/AddCollections';
import ProductDetail from './pages/ProductDetail';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import CollectionDetail from './pages/CollectionDetail';
import LandingPage from './pages/LandingPage';
import AddBrands from './pages/AddBrands';
import Brands from './pages/Brands';
import BrandDetail from './pages/BrandDetail'

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/new" component={AddProducts} />
        <Route exact path="/collections" component={Collections} />
        <Route exact path="/collections/new" component={AddCollections} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route exact path="/collection/:id" component={CollectionDetail} />
        <Route exact path="/brands/new" component={AddBrands} />
        <Route exact path="/brands" component={Brands} />
        <Route exact path="/brand/:id" component={BrandDetail} />
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </Router >
  );
}

export default App;
