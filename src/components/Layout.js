import React, { useState, useEffect } from "react";
import Header from "./Header";
import CartList from "./CartList";
import Home from "./Home";
import Shop from "./Shop";
import ProductList from "./ProductList";
import Footer from "./Footer";

const Layout = (loggedInUserName) => {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);

  useEffect(() => {
    // Fetch product data
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          "https://add-to-card-a30ca-default-rtdb.firebaseio.com/Products.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data.");
        }
        const data = await response.json();
        const loadedProducts = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setProduct(loadedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductData();
  }, []);

  const addToCart = (data) => {
    const itemIndex = cart.findIndex((item) => item.name === data.name);
    if (itemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...data, quantity: 1 }]);
    }
  };

  const handleShowCart = (value) => {
    setShowCart(value);
  };

  const handleShowShop = (value) => {
    setShowShop(value);
  };

  const closeWelcomeDialog = () => {
    setShowWelcomeDialog(false);
  };

  return (
    <div>
      <Header
        count={cart.length}
        handleShowCart={handleShowCart}
        handleShowShop={handleShowShop}
      />
      {showCart ? (
        <CartList cart={cart} />
      ) : showShop ? (
        <Shop product={product} addToCart={addToCart} />
      ) : (
        <>
          {!showCart && <Home />}
          <ProductList product={product} addToCart={addToCart} />
        </>
      )}
      <Footer />;
      {showWelcomeDialog && (
        <div className="welcome-dialog">
          <h2>Welcome, {loggedInUserName}!</h2>
          <p>Thank you for logging in.</p>
          <button onClick={closeWelcomeDialog}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Layout;
