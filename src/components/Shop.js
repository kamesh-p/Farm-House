import React from "react";
import "../style/shop.css";

function Shop({ product, addToCart }) {
  return (
    <div>
      <div id="category-section-dairy" className="category-section-Dairy">
        <h2 className="category">Farm Dairy</h2>
      </div>
      <div className="flex">
        {product.map((productItem) => {
          // Check if the product item belongs to the "Farm Dairy" category
          if (productItem.classification === "Dairy") {
            return (
              <div className="product-item" key={productItem.id}>
                <div className="product-info">
                  <img src={productItem.url} alt="img" />
                  <p>
                    {productItem.name} | {productItem.classification}
                  </p>
                  <p>{productItem.category}</p>
                  <p>Rs. {productItem.price} /-</p>
                  <button onClick={() => addToCart(productItem)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div id="category-section-meat" className="category-section-meat">
        <h2 className="category">Farm Meat</h2>
      </div>
      <div className="flex">
        {product.map((productItem) => {
          // Check if the product item belongs to the "Farm Meat" category
          if (productItem.classification === "meat") {
            return (
              <div className="product-item" key={productItem.id}>
                <div className="product-info">
                  <img src={productItem.url} alt="img" />
                  <p>
                    {productItem.name} | {productItem.classification}
                  </p>
                  <p>{productItem.category}</p>
                  <p>Rs. {productItem.price} /-</p>
                  <button onClick={() => addToCart(productItem)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div id="category-section-food" className="category-section-food">
        <h2 className="category">Farm Food</h2>
      </div>
      <div className="flex">
        {product.map((productItem) => {
          // Check if the product item belongs to the "Farm Food" category
          if (productItem.classification === "food") {
            return (
              <div className="product-item" key={productItem.id}>
                <div className="product-info">
                  <img src={productItem.url} alt="img" />
                  <p>
                    {productItem.name} | {productItem.classification}
                  </p>
                  <p>{productItem.category}</p>
                  <p>Rs. {productItem.price} /-</p>
                  <button onClick={() => addToCart(productItem)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Shop;
