import React from "react";
import "../style/ProductList.css";

function ProductList({ product, addToCart }) {
  const getTopThreeByClassification = (classification, sortBy) => {
    const filteredProducts = product.filter(
      (productItem) => productItem.classification === classification
    );
    const sortedProducts = filteredProducts.sort(
      (a, b) => b[sortBy] - a[sortBy]
    );
    return sortedProducts.slice(0, 3);
  };

  return (
    <div className="product-list-container">
      <div className="Best Selling Products" id="Best Selling Products">
        <h2 className="bsp">BEST SELLING PRODUCT</h2>
        <div className="product-section">
          <h3>FARM DAIRY BEST SELLING</h3>
          <div className="product-row">
            {getTopThreeByClassification("Dairy", "totalorder").map(
              (productItem) => (
                <div className="product-item" key={productItem.id}>
                  <img src={productItem.url} alt="img" />
                  <p>
                    {productItem.name} | {productItem.classification}
                  </p>
                  <p>{productItem.seller}</p>
                  <p>Rs. {productItem.price} /-</p>

                  <button onClick={() => addToCart(productItem)}>
                    Add To Cart
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        <div className="product-section">
          <h3>FARM MEAT BEST SELLING</h3>
          <div className="product-row">
            {getTopThreeByClassification("meat", "totalorder").map(
              (productItem) => (
                <div className="product-item" key={productItem.id}>
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
              )
            )}
          </div>
        </div>

        <div className="product-section">
          <h3>FARM FOOD BEST SELLING</h3>
          <div className="product-row">
            {getTopThreeByClassification("food", "totalorder").map(
              (productItem) => (
                <div className="product-item" key={productItem.id}>
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
              )
            )}
          </div>
        </div>
      </div>
      <div id="Trending product" className="Trending product">
        <h2 className="tp">TRENDING PRODUCT</h2>
        <div className="product-section">
          <h3>FARM DAIRY TRENDING</h3>
          <div className="product-row">
            {getTopThreeByClassification("Dairy", "search").map(
              (productItem) => (
                <div className="product-item" key={productItem.id}>
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
              )
            )}
          </div>
        </div>

        <div className="product-section">
          <h3>FARM MEAT TRENDING</h3>
          <div className="product-row">
            {getTopThreeByClassification("meat", "search").map(
              (productItem) => (
                <div className="product-item" key={productItem.id}>
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
              )
            )}
          </div>
        </div>

        <div className="product-section">
          <h3>FARM FOOD TRENDING</h3>
          <div className="product-row">
            {getTopThreeByClassification("food", "search").map(
              (productItem) => (
                <div className="product-item" key={productItem.id}>
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
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
