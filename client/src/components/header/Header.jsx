import "./header.css";
import NavItem from "./NavItem";
import { useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

axios.defaults.withCredentials = true;

const Header = () => {
  const [page, setPage] = useState(1);
  const history = useHistory();

  const handleClick = (selectedPage) => {
    setPage(selectedPage);
  };
  const [user, updateUser] = useLoginContext();

  const handleLogout = (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:3000/logout")
      .then((res) => {
        console.log("logging out");
        updateUser(null);
        history.push("/login");
      })
      .catch((err) => console.log(err));
  };

  console.log("USER HEAD", user);
  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__list">
          <NavItem
            isActive={page === 1}
            to="/"
            onClick={() => {
              handleClick(1);
            }}
          >
            Shop
          </NavItem>
          <NavItem
            isActive={page === 2}
            to="/products"
            onClick={() => {
              handleClick(2);
            }}
          >
            Products
          </NavItem>
          {user && (
            <NavItem
              isActive={page === 3}
              to="/cart"
              onClick={() => {
                handleClick(3);
              }}
            >
              Cart
            </NavItem>
          )}
          {user && (
            <NavItem
              isActive={page === 6}
              to="/orders"
              onClick={() => {
                handleClick(6);
              }}
            >
              Orders
            </NavItem>
          )}
          {user && (
            <NavItem
              isActive={page === 4}
              to="/admin/add-product"
              onClick={() => {
                handleClick(4);
              }}
            >
              Add Product
            </NavItem>
          )}
          {user && (
            <NavItem
              isActive={page === 5}
              to="/admin/products"
              onClick={() => handleClick(5)}
            >
              Admin Products
            </NavItem>
          )}
        </ul>
        <div className="main-header__login">
          {!user && (
            <form action="/login">
              <button className="main-header__btn" type="submit">
                Login
              </button>
            </form>
          )}
          {!user && (
            <form action="/signup">
              <button className="main-header__btn" type="submit">
                signup
              </button>
            </form>
          )}
          {user && (
            <form onSubmit={handleLogout}>
              <button className="main-header__btn" type="submit">
                Logout
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
