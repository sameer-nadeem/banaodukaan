import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import AddProducts from './components/Forms/AddProducts'
import Collections from './pages/Collections';
import AddCollections from './components/Forms/AddCollections';
import ProductDetail from './pages/ProductDetail';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import CollectionDetail from './pages/CollectionDetail';
import LandingPage from './pages/LandingPage';
import AnalyticsPage from './pages/Analytics';
import AddBrands from './components/Forms/AddBrands';
import Brands from './pages/Brands';
import BrandDetail from './pages/BrandDetail'
import Customers from './pages/Customers'
import AddCustomers from './components/Forms/AddCustomers';
import CustomerDetail from './pages/CustomerDetail';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Landing from './pages/Landing';
import setAuthToken from './utils/setAuthToken';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/Routing/PrivateRoute';

setAuthToken();



function App() {
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  useEffect(() => {
    setAuthToken()
  }, [token])

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])


  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <PrivateRoute exact path = "/admin/orders" component={Orders} />
        <PrivateRoute exact path = "/admin/order/:id" component={OrderDetail} />
        <PrivateRoute exact path="/admin/products" component={Products} />
        <PrivateRoute exact path = "/admin/inventory" component={Inventory} />
        <PrivateRoute exact path="/admin/products/new" component={AddProducts} />
        <PrivateRoute exact path="/admin/collections" component={Collections} />
        <PrivateRoute exact path="/admin/collections/new" component={AddCollections} />
        <PrivateRoute exact path="/admin/product/:id" component={ProductDetail} />
        <PrivateRoute exact path="/admin/collection/:id" component={CollectionDetail} />
        <PrivateRoute exact path="/admin/brands/new" component={AddBrands} />
        <PrivateRoute exact path="/admin/brands" component={Brands} />
        <PrivateRoute exact path="/admin/brand/:id" component={BrandDetail} />
        <PrivateRoute exact path="/admin/customers" component={Customers} />
        <PrivateRoute exact path="/admin/customers/new" component={AddCustomers} />
        <PrivateRoute exact path="/admin/customers/:id" component={CustomerDetail} />
        <PrivateRoute exact path="/admin/analytics" component={AnalyticsPage} />
        <PrivateRoute exact path="/admin/" component={Landing} />
      </Switch>
    </Router >
  );
}

export default App;
