import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { decreaseQuantity, increaseQuantity } from "../features/cartSlice";
import { Link } from "react-router-dom";

const CartSummary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const dispatch = useDispatch();

  const handleDropdownMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(increaseQuantity(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product));
  };

  const buttonStyle = {
    cursor: "pointer",
    padding: "5px 10px",
    borderRadius: "10 px",
    marginLeft: "5px",
  };

  const decreaseButtonStyle = {
    ...buttonStyle,
    backgroundColor: "red",
    color: "white",
  };

  const increaseButtonStyle = {
    ...buttonStyle,
    backgroundColor: "green",
    color: "white",
  };

  const itemContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
  };

  return (
    <div>
      <Dropdown isOpen={isOpen} toggle={handleDropdownMenu}>
        <DropdownToggle caret>Cart</DropdownToggle>

        <DropdownMenu end>
          {cart.length === 0 ? (
            <DropdownItem> Your cart is empty </DropdownItem>
          ) : (
            Array.isArray(cart) &&
            cart.map((product, index) => (
              <DropdownItem key={`${product.id}-${index}`}>
                <div style={itemContainerStyle}>
                  <span
                    style={decreaseButtonStyle}
                    onClick={() => handleDecreaseQuantity(product)}
                  >
                    {"  "}-{"   "}
                  </span>{" "}
                  {product.productName} - {product.quantity}{" "}
                  <span
                    style={increaseButtonStyle}
                    onClick={() => handleIncreaseQuantity(product)}
                  >
                    {" "}
                    +{" "}
                  </span>
                </div>
              </DropdownItem>
            ))
          )}
          <DropdownItem>
            <Link to="cart">Go to Cart</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default CartSummary;
