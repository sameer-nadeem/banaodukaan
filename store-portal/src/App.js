import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import AddProducts from './components/Forms/AddProducts'
import Collections from './pages/Collections';
import AddCollections from './components/Forms/AddCollections';
import ProductDetail from './pages/ProductDetail';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import CollectionDetail from './pages/CollectionDetail';
import LandingPage from './pages/LandingPage';
import AddBrands from './components/Forms/AddBrands';
import Brands from './pages/Brands';
import BrandDetail from './pages/BrandDetail'
import Customers from './pages/Customers'
import AddCustomers from './components/Forms/AddCustomers';
import CustomerDetail from './pages/CustomerDetail';
import Cookies from 'universal-cookie'
function App() {

  const cookies = new Cookies()
  console.log(cookies.get("token"))
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/admin/products" component={Products} />
        <Route exact path="/admin/products/new" component={AddProducts} />
        <Route exact path="/admin/collections" component={Collections} />
        <Route exact path="/admin/collections/new" component={AddCollections} />
        <Route exact path="/admin/product/:id" component={ProductDetail} />
        <Route exact path="/admin/collection/:id" component={CollectionDetail} />
        <Route exact path="/admin/brands/new" component={AddBrands} />
        <Route exact path="/admin/brands" component={Brands} />
        <Route exact path="/admin/brand/:id" component={BrandDetail} />
        <Route exact path="/admin/customers" component={Customers} />
        <Route exact path="/admin/customers/new" component={AddCustomers} />
        <Route exact path="/admin/customers/:id" component={CustomerDetail} />
        <Route exact path="/admin/" component={LandingPage} />
      </Switch>
    </Router >
  );
}

export default App;
