import React, { useEffect } from "react";
import { fetchProducts } from "../features/productSlice";
import { useDispatch } from "react-redux";
import CartSummary from "./CartSummary";
import { Nav, NavItem, Navbar, NavbarBrand, NavLink } from "reactstrap";

const Navigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const enablePreventDefault = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container text-center">
      <Navbar>
        <NavbarBrand href="/">top5 e-commerce</NavbarBrand>
        <div className="custom-navbar-component">
          <Nav pills>
            <NavItem>
              <div className="d-flex">
                <NavLink href="signin" onClick={() => enablePreventDefault}>
                  {" "}
                  Sign In
                </NavLink>
              </div>
            </NavItem>
            <NavItem>
              <div className="d-flex">
                <NavLink href="signup" onClick={() => enablePreventDefault}>
                  {" "}
                  Sign Up
                </NavLink>
              </div>
            </NavItem>
            <NavItem>
              <CartSummary />
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
};

export default Navigator;
