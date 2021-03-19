import "./header.css";
import NavItem from "./NavItem";
import { useState } from "react";

const Header = () => {
  const [page, setPage] = useState(1);

  const handleClick = (selectedPage) => {
    console.log(selectedPage);
    setPage(selectedPage);
  };

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
          <NavItem
            isActive={page === 3}
            to="/cart"
            onClick={() => {
              handleClick(3);
            }}
          >
            Cart
          </NavItem>
          <NavItem
            isActive={page === 6}
            to="/orders"
            onClick={() => {
              handleClick(6);
            }}
          >
            Orders
          </NavItem>
          <NavItem
            isActive={page === 4}
            to="/admin/add-product"
            onClick={() => {
              handleClick(4);
            }}
          >
            Add Product
          </NavItem>
          <NavItem
            isActive={page === 5}
            to="/admin/products"
            onClick={() => handleClick(5)}
          >
            Admin Products
          </NavItem>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
