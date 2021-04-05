import { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AddProduct from "./components/admin/AddProduct";
import Header from "./components/header/Header";
import { LoginProvider } from "./context/LoginContext";
import AdminProducts from "./pages/AdminProducts";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";
import { postRequest } from "./services/fetchdata";

function App() {
  const [isAuth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [routes, setRoutes] = useState("");

  const handleLogin = (event, username, password) => {
    event.preventDefault();
    postRequest("/login", { username, password })
      .then((data) => {
        setUserId(data.userId);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        //this.setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        console.log("LOGIN ERROR");
      });
  };

  const defaultRoute = () => {
    setRoutes(
      <Fragment>
        <Route
          path="/"
          exact
          component={(props) => <Login {...props} onLogin={handleLogin} />}
        ></Route>
        <Route path="/signup" exact component={Signup}></Route>
      </Fragment>
    );
  };

  useEffect(() => {
    defaultRoute();
  }, []);

  useEffect(() => {
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuth) {
      setRoutes(
        <Fragment>
          <Route
            path="/"
            exact
            component={(props) => <Shop token={token} userId={userId} />}
          ></Route>
          <Route
            path="/products"
            exact
            component={(props) => <Products token={token} userId={userId} />}
          ></Route>
          <Route
            path="/product/:id"
            exact
            component={(props) => (
              <ProductDetail token={token} userId={userId} />
            )}
          ></Route>
          <Route
            path="/cart"
            exact
            component={(props) => <Cart token={token} userId={userId} />}
          ></Route>
          <Route
            path="/orders"
            exact
            component={(props) => <Orders token={token} userId={userId} />}
          ></Route>
          <Route
            path="/admin/add-product"
            exact
            component={(props) => <AddProduct token={token} userId={userId} />}
          ></Route>
          <Route
            path="/admin/add-product/:id"
            exact
            component={(props) => <AddProduct token={token} userId={userId} />}
          ></Route>
          <Route
            path="/admin/products"
            exact
            component={(props) => (
              <AdminProducts token={token} userId={userId} />
            )}
          ></Route>
          <Redirect to="/" />
        </Fragment>
      );
    } else {
      defaultRoute();
    }
  }, [isAuth]);

  return (
    <>
      <LoginProvider>
        <Router>
          <Header isAuth={isAuth}></Header>
          <Switch>{routes}</Switch>
        </Router>
      </LoginProvider>
    </>
  );
}

export default App;
