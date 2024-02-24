import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "reactstrap";
import { fetchProducts } from "../features/productSlice";
import { fetchCategories } from "../features/categorySlice";
import { addToCart } from "../features/cartSlice";
import alertify from "alertifyjs";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productsSelectedByCategoryId = useSelector(
    (state) => state.products.productsSelectedByCategoryId
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    try {
      dispatch(
        addToCart({
          ...product,
          unitPrice: product.unitPrice,
        })
      );
      alertify.set("notifier", "position", "bottom-right");
      alertify.set("notifier", "delay", 3);
      alertify.success(
        `${product.productName} added to cart.`,
        console.log("working")
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  const productsToRender =
    productsSelectedByCategoryId.length > 0
      ? productsSelectedByCategoryId
      : products;

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quantity per Unit</th>
            <th>Units in Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(productsToRender) &&
            productsToRender.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.productName}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    color="success"
                    outline
                  >
                    Add to Cart
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;
