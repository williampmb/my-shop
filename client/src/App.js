import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Shop from "./pages/Shop";
import AddProduct from "./components/admin/AddProduct";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import AdminProducts from "./pages/AdminProducts";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import { LoginProvider } from "./context/LoginContext";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <LoginProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/" exact component={Shop}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/signup" exact component={Signup}></Route>
            <Route path="/products" exact component={Products}></Route>
            <Route path="/product/:id" exact component={ProductDetail}></Route>
            <Route path="/cart" exact component={Cart}></Route>
            <Route path="/orders" exact component={Orders}></Route>
            <Route
              path="/admin/add-product"
              exact
              component={AddProduct}
            ></Route>
            <Route
              path="/admin/add-product/:id"
              exact
              component={AddProduct}
            ></Route>
            <Route
              path="/admin/products"
              exact
              component={AdminProducts}
            ></Route>
          </Switch>
        </Router>
      </LoginProvider>
    </>
  );
}

export default App;
