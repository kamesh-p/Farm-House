import React, { useState, useEffect } from "react";
import "../style/catList.css";
import Dialog from "./Dialog";

function CartList({ cart }, { currentuser }) {
  const [farmDairyItems, setFarmDairyItems] = useState([]);
  const [farmMeatItems, setFarmMeatItems] = useState([]);
  const [farmFoodItems, setFarmFoodItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  console.log(currentuser);
  // console.log(loggedInUsername);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    totalPrice: 0,
  });
  const [showDialog, setShowDialog] = useState(false);

  const handleDecrease = (items, index) => {
    const updatedItems = items.map((item, i) => {
      return index === i
        ? {
            ...item,
            quantity: item.quantity > 0 ? item.quantity - 1 : 0,
          }
        : item;
    });

    updateItemsState(items, updatedItems);
    updateTotalPrice();
  };

  const handleIncrease = (items, index) => {
    const updatedItems = items.map((item, i) => {
      return index === i ? { ...item, quantity: item.quantity + 1 } : item;
    });

    updateItemsState(items, updatedItems);
    updateTotalPrice();
  };

  const updateItemsState = (oldItems, updatedItems) => {
    const nonZeroQuantityItems = updatedItems.filter(
      (item) => item.quantity > 0
    );

    if (oldItems === farmDairyItems) {
      setFarmDairyItems(nonZeroQuantityItems);
    } else if (oldItems === farmMeatItems) {
      setFarmMeatItems(nonZeroQuantityItems);
    } else if (oldItems === farmFoodItems) {
      setFarmFoodItems(nonZeroQuantityItems);
    }
  };

  const updateTotalPrice = () => {
    const total = cart.reduce((acc, item) => {
      const farmItems = [...farmDairyItems, ...farmMeatItems, ...farmFoodItems];
      const farmItem = farmItems.find((farmItem) => farmItem.id === item.id);
      if (farmItem) {
        return acc + farmItem.price * farmItem.quantity;
      }
      return acc;
    }, 0);
    console.log(total);
    setFormData({ ...formData, totalPrice: total });
  };

  const handleOrder = () => {
    setShowDialog(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://add-to-card-a30ca-default-rtdb.firebaseio.com/FarmHouseOrder.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post order data.");
      }

      setOrderPlaced(true);
      setTimeout(() => {
        setFormData({
          name: "",
          address: "",
          phoneNumber: "",
          totalPrice: 0,
        });
        setFarmDairyItems([]);
        setFarmMeatItems([]);
        setFarmFoodItems([]);
        setOrderPlaced(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const dairyItems = cart.filter((item) => item.classification === "Dairy");
    const meatItems = cart.filter((item) => item.classification === "meat");
    const foodItems = cart.filter((item) => item.classification === "food");

    setFarmDairyItems(dairyItems);
    setFarmMeatItems(meatItems);
    setFarmFoodItems(foodItems);

    updateTotalPrice();
  }, []);

  return (
    <div>
      <h2>Farm Dairy</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {farmDairyItems.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.url} width={40} alt={item.name} />
              </td>
              <td>{item.name}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleDecrease(farmDairyItems, index)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="btn"
                  onClick={() => handleIncrease(farmDairyItems, index)}
                >
                  +
                </button>
              </td>
              <td>Rs. {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Farm Meat</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {farmMeatItems.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.url} width={40} alt={item.name} />
              </td>
              <td>{item.name}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleDecrease(farmMeatItems, index)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="btn"
                  onClick={() => handleIncrease(farmMeatItems, index)}
                >
                  +
                </button>
              </td>
              <td>Rs. {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Farm Food</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {farmFoodItems.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.url} width={40} alt={item.name} />
              </td>
              <td>{item.name}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleDecrease(farmFoodItems, index)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="btn"
                  onClick={() => handleIncrease(farmFoodItems, index)}
                >
                  +
                </button>
              </td>
              <td>Rs. {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Total:{" "}
        {farmDairyItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) +
          farmMeatItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ) +
          farmFoodItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
      </p>

      <button className="btn" onClick={handleOrder}>
        Order
      </button>

      {showDialog && (
        <Dialog onClose={() => setShowDialog(false)}>
          <form onSubmit={handleSubmit}>
            <h2>Place Order</h2>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />

            <button type="submit">Submit Order</button>
          </form>
        </Dialog>
      )}

      {orderPlaced && (
        <div className="overlay">
          <div className="success-modal">
            <h2>Order Placed Successfully!</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartList;
