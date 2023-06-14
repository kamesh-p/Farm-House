import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { Link } from "react-router-dom";
import "../style/Header.css";
import logo from "../assert/image/logo-modified.png";

function Header(props) {
  const dispatch = useDispatch();
  const [showHomeDropdown, setShowHomeDropdown] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const logOutHandler = () => {
    dispatch(authActions.logout());
  };

  const handleShoppingAppClick = () => {
    props.handleShowCart(false);
    props.handleShowShop(false);
    setShowHomeDropdown((prevState) => !prevState);
  };

  const handleCartClick = () => {
    props.handleShowCart(true);
    props.handleShowShop(false);
    setShowHomeDropdown(false);
  };

  const handleShopClick = () => {
    props.handleShowCart(false);
    props.handleShowShop(true);
    setShowShopDropdown((prevState) => !prevState);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown((prevState) => !prevState);
  };

  const handleBestSelling = () => {
    const dairySection = document.getElementById("Best Selling Products");
    dairySection.scrollIntoView({ behavior: "smooth" });
    setShowHomeDropdown(false); // Close the Home dropdown when clicking the link
  };

  const handleTrendingProduct = () => {
    const dairySection = document.getElementById("Trending product");
    dairySection.scrollIntoView({ behavior: "smooth" });
    setShowHomeDropdown(false); // Close the Home dropdown when clicking the link
  };

  const handleFarmDairyClick = () => {
    const dairySection = document.getElementById("category-section-dairy");
    dairySection.scrollIntoView({ behavior: "smooth" });
    setShowShopDropdown(false); // Close the Shop dropdown when clicking the link
  };

  const handleFarmMeatClick = () => {
    const meatSection = document.getElementById("category-section-meat");
    meatSection.scrollIntoView({ behavior: "smooth" });
    setShowShopDropdown(false); // Close the Shop dropdown when clicking the link
  };

  const handleFarmFoodClick = () => {
    const meatSection = document.getElementById("category-section-food");
    meatSection.scrollIntoView({ behavior: "smooth" });
    setShowShopDropdown(false); // Close the Shop dropdown when clicking the link
  };

  return (
    <div className="header">
      <div className="header-left">
        <img
          onClick={handleShoppingAppClick}
          src={logo}
          alt="Logo"
          className="logo"
        />

        <h1 className="company-name">FarmHouse</h1>
      </div>
      <nav className="nav-desktop">
        <ul>
          <li className={`user-dropdown ${showHomeDropdown ? "active" : ""}`}>
            <div className="dropdown">
              <span className="header-link" onClick={handleShoppingAppClick}>
                Home
              </span>
              {showHomeDropdown && (
                <div className="dropdown-content">
                  <span onClick={handleBestSelling}>Selling Products</span>
                  <span onClick={handleTrendingProduct}>Trending Products</span>
                </div>
              )}
            </div>
          </li>
          <li onClick={handleCartClick}>
            <Link to="/cart">
              <span className="header-link">Cart</span>
              {props.count > 0 && <sup>{props.count}</sup>}
            </Link>
          </li>
          <li className={`user-dropdown ${showShopDropdown ? "active" : ""}`}>
            <div className="dropdown">
              <span className="header-link" onClick={handleShopClick}>
                Shop
              </span>
              {showShopDropdown && (
                <div className="dropdown-content">
                  <span onClick={handleFarmDairyClick}>Farm Dairy</span>
                  <span onClick={handleFarmMeatClick}>Farm Meat</span>
                  <span onClick={handleFarmFoodClick}>Farm Food</span>
                </div>
              )}
            </div>
          </li>
          <li className={`user-dropdown ${showUserDropdown ? "active" : ""}`}>
            <div className="dropdown">
              <span className="header-link" onClick={toggleUserDropdown}>
                User
              </span>
              {showUserDropdown && (
                <div className="dropdown-content">
                  <Link to="/history">My History</Link>
                  <span onClick={logOutHandler}>
                    <Link to="/">Logout</Link>
                  </span>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
