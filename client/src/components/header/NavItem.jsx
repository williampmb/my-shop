import { Link } from "react-router-dom";

const NavItem = ({ isActive, children, to, onClick }) => {
  if (!children) return;
  return (
    <li className={isActive ? "main-header__item active" : "main-header__item"}>
      <Link className="main-header__link" to={to} onClick={onClick}>
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
