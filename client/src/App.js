import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Shop from "./pages/Shop";
import AddProduct from "./components/admin/AddProduct";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import AdminProducts from "./pages/AdminProducts";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/" exact component={Shop}></Route>
          <Route path="/products" exact component={Products}></Route>
          <Route path="/product/:id" exact component={ProductDetail}></Route>
          <Route path="/cart" exact component={Cart}></Route>
          <Route path="/orders" exact component={Orders}></Route>
          <Route path="/admin/add-product" exact component={AddProduct}></Route>
          <Route
            path="/admin/add-product/:id"
            exact
            component={AddProduct}
          ></Route>
          <Route path="/admin/products" exact component={AdminProducts}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
