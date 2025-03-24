import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import NavBAR from './components/NavBAR';
import { useSelector } from 'react-redux';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from'./pages/ShopingCart';
import Buy from './pages/Buy'
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  const favoritesCount = useSelector((state) => state.fav.favorites?.length || 0);
  const cartCount = useSelector((state) => state.cart.cart?.length || 0);

  return (
    <div className="App">
      <BrowserRouter basename="/React-E-commerce">
        <NavBAR favoritesCount={favoritesCount} cartCount={cartCount} />
        <br/>
        <br/>
        <Switch>
          <Route path="/" component={Products} exact />
          <Route path="/productdetails/:id" component={ProductDetails} exact />
          <Route path="/favorites" component={Favorites} exact />
          <Route path="/register" component={RegisterForm} exact />
          <Route path="/login" component={LoginForm} exact />
          <Route path="/admin" component={AdminDashboard} exact />
          <Route path="/shoppingcart" component={ShoppingCart} exact />
          <Route path="/buy" component={Buy} exact />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
