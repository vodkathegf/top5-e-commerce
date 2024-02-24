import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../features/cartSlice";
import { Button, Table } from "reactstrap";

const CartList = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

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

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th></th>
            <th>Aggregate Price</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cart) && cart.length === 0 ? (
            <tr>
              <th>Your Cart is Empty</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ) : (
            cart.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.productName}</td>
                <td>{product.unitPrice}</td>
                <td>
                  <Button
                    style={decreaseButtonStyle}
                    onClick={() => handleDecreaseQuantity(product)}
                  >
                    {" "}
                    -{" "}
                  </Button>
                  <Button
                    style={increaseButtonStyle}
                    onClick={() => handleIncreaseQuantity(product)}
                  >
                    {" "}
                    +{" "}
                  </Button>
                </td>
                <td>{product.unitPrice * product.quantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CartList;
